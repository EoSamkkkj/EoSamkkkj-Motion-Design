import "server-only";
import type { PortfolioVideo, VideoMeta } from "./content-types";
import { parseVideo } from "./video";

// Busca no Vimeo/YouTube (oEmbed) a capa, o formato e a duração de cada
// vídeo do portfólio — assim o card já nasce com a capa certa e no mesmo
// formato do vídeo (sem bordas pretas), sem o Sam precisar preencher nada.
// Fica em cache por um dia.

const DAY = 60 * 60 * 24;

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

async function fetchMeta(url: string): Promise<VideoMeta | undefined> {
  const src = parseVideo(url);
  const endpoint =
    src.kind === "vimeo"
      ? `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${src.id}`)}&width=720`
      : src.kind === "youtube"
        ? `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${src.id}`)}`
        : null;
  if (!endpoint) return undefined;

  try {
    const res = await fetch(endpoint, { next: { revalidate: DAY } });
    if (!res.ok) return undefined;
    const d = await res.json();
    const width = Number(d.width);
    const height = Number(d.height);
    // shorts do YouTube vêm com o oEmbed horizontal; o link entrega o formato
    const vertical = src.kind === "youtube" && /\/shorts\//.test(url);
    return {
      title: typeof d.title === "string" ? d.title : undefined,
      thumbnail:
        src.kind === "youtube"
          ? `https://i.ytimg.com/vi/${src.id}/${vertical ? "oar2" : "maxresdefault"}.jpg`
          : typeof d.thumbnail_url === "string"
            ? d.thumbnail_url
            : undefined,
      ratio: vertical ? 9 / 16 : width > 0 && height > 0 ? width / height : undefined,
      duration: Number(d.duration) > 0 ? formatDuration(Number(d.duration)) : undefined,
    };
  } catch (err) {
    console.error("[video-meta] falha ao ler", url, err);
    return undefined;
  }
}

export async function withVideoMeta(videos: PortfolioVideo[]): Promise<PortfolioVideo[]> {
  return Promise.all(
    videos.map(async (v) => ({ ...v, meta: await fetchMeta(v.videoUrl) }))
  );
}
