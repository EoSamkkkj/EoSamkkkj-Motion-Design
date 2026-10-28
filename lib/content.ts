import "server-only";
import { del, list, put } from "@vercel/blob";
import { revalidateTag, unstable_cache } from "next/cache";
import { defaultContent } from "./content-defaults";
import type {
  FaqItem,
  PortfolioLevel,
  PortfolioVideo,
  PricePlan,
  SiteContent,
} from "./content-types";

// Cada publicação vira um arquivo novo em site-content/ (nome único, então
// nunca existe cache velho de CDN). O site lê o mais recente e guarda em
// cache até a próxima publicação, que invalida a tag abaixo.
const PREFIX = "site-content/";
const TAG = "site-content";
const HISTORY = 10;

export const storageEnabled = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const str = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const optStr = (v: unknown, max = 2000) => str(v, max) || undefined;

/** Garante o formato esperado e descarta qualquer campo estranho. */
export function normalizeContent(raw: unknown): SiteContent {
  const r = (raw ?? {}) as Record<string, unknown>;
  const arr = (v: unknown) => (Array.isArray(v) ? v : []);

  const levels: PortfolioLevel[] = arr(r.levels)
    .map((l) => ({ id: str(l?.id, 60), label: str(l?.label, 60) }))
    .filter((l) => l.id && l.label);

  const levelIds = new Set(levels.map((l) => l.id));
  const videos: PortfolioVideo[] = arr(r.videos)
    .map((v) => ({
      id: str(v?.id, 60),
      level: str(v?.level, 60),
      category: str(v?.category, 80),
      videoUrl: str(v?.videoUrl, 1000),
      duration: optStr(v?.duration, 20),
      featured: v?.featured === true || undefined,
    }))
    .filter((v) => v.id && v.videoUrl && levelIds.has(v.level));

  const plans: PricePlan[] = arr(r.plans)
    .map((p) => ({
      id: str(p?.id, 60),
      name: str(p?.name, 80),
      price: str(p?.price, 60),
      duration: str(p?.duration, 80),
      description: str(p?.description, 600),
      narration: optStr(p?.narration, 400),
      deadline: str(p?.deadline, 80),
      revisions: str(p?.revisions, 80),
      ctaLabel: str(p?.ctaLabel, 60),
      message: str(p?.message, 1000),
      highlight: p?.highlight === true || undefined,
      badge: optStr(p?.badge, 40),
    }))
    .filter((p) => p.id && p.name);

  const faq: FaqItem[] = arr(r.faq)
    .map((f) => ({ question: str(f?.question, 200), answer: str(f?.answer, 1200) }))
    .filter((f) => f.question && f.answer);

  return {
    version: 1,
    levels: levels.length ? levels : defaultContent.levels,
    videos,
    plans,
    faq,
    updatedAt: optStr(r.updatedAt, 40),
  };
}

async function listVersions() {
  const { blobs } = await list({ prefix: PREFIX });
  return blobs.sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
}

/** Lê a versão publicada mais recente, sem cache (usado pelo painel). */
export async function getContentFresh(): Promise<SiteContent> {
  if (!storageEnabled()) return defaultContent;
  try {
    const [latest] = await listVersions();
    if (!latest) return defaultContent;
    const res = await fetch(latest.url, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return normalizeContent(await res.json());
  } catch (err) {
    console.error("[content] falha ao ler o conteúdo publicado:", err);
    return defaultContent;
  }
}

/** Versão em cache para o site público; renovada a cada publicação. */
export const getContent = unstable_cache(getContentFresh, [TAG], { tags: [TAG] });

export async function saveContent(content: SiteContent): Promise<SiteContent> {
  if (!storageEnabled()) {
    throw new Error("Armazenamento não configurado (BLOB_READ_WRITE_TOKEN ausente).");
  }
  const clean = normalizeContent({ ...content, updatedAt: new Date().toISOString() });
  await put(`${PREFIX}content.json`, JSON.stringify(clean), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
  });

  // mantém só as últimas versões, como histórico
  try {
    const old = (await listVersions()).slice(HISTORY);
    if (old.length) await del(old.map((b) => b.url));
  } catch (err) {
    console.error("[content] falha ao limpar versões antigas:", err);
  }

  revalidateTag(TAG);
  return clean;
}
