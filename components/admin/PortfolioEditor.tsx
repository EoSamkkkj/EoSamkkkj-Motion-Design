"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { upload } from "@vercel/blob/client";
import {
  ArrowDown,
  ArrowUp,
  Film,
  Link2,
  Plus,
  Star,
  Trash2,
  UploadCloud,
} from "lucide-react";
import type { PortfolioVideo, SiteContent } from "@/lib/content-types";
import { parseVideo, videoThumbnail } from "@/lib/video";
import { Button, Card, Field, IconButton, inputClass, moveItem, slugify, uid } from "./ui";

interface Props {
  content: SiteContent;
  onChange: (next: SiteContent) => void;
  storageReady: boolean;
}

function Thumb({ url }: { url: string }) {
  const src = parseVideo(url);
  const thumb = videoThumbnail(src);
  return (
    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-ink">
      {thumb ? (
        <img src={thumb} alt="" className="h-full w-full object-cover" loading="lazy" />
      ) : src.kind === "file" ? (
        <video src={`${src.url}#t=0.5`} muted preload="metadata" className="h-full w-full object-cover" />
      ) : (
        <Film className="absolute inset-0 m-auto text-white/40" size={20} />
      )}
    </div>
  );
}

export default function PortfolioEditor({ content, onChange, storageReady }: Props) {
  const { levels, videos } = content;
  const [newLevel, setNewLevel] = useState("");

  // ---------- seções ----------
  function addLevel() {
    const label = newLevel.trim();
    if (!label) return;
    let id = slugify(label) || uid("secao-");
    while (levels.some((l) => l.id === id)) id = `${id}-2`;
    onChange({ ...content, levels: [...levels, { id, label }] });
    setNewLevel("");
  }

  function renameLevel(id: string, label: string) {
    onChange({ ...content, levels: levels.map((l) => (l.id === id ? { ...l, label } : l)) });
  }

  function removeLevel(id: string) {
    const count = videos.filter((v) => v.level === id).length;
    if (levels.length <= 1) return alert("O portfólio precisa ter pelo menos uma seção.");
    if (count && !confirm(`Essa seção tem ${count} vídeo(s). Apagar a seção e os vídeos dela?`)) return;
    onChange({
      ...content,
      levels: levels.filter((l) => l.id !== id),
      videos: videos.filter((v) => v.level !== id),
    });
  }

  // ---------- vídeos ----------
  function updateVideo(id: string, patch: Partial<PortfolioVideo>) {
    onChange({ ...content, videos: videos.map((v) => (v.id === id ? { ...v, ...patch } : v)) });
  }

  function removeVideo(id: string) {
    if (!confirm("Remover este vídeo do site?")) return;
    onChange({ ...content, videos: videos.filter((v) => v.id !== id) });
  }

  function moveVideo(id: string, dir: -1 | 1) {
    // move dentro da mesma seção, pulando vídeos de outras seções
    const level = videos.find((v) => v.id === id)?.level;
    const sameLevel = videos.filter((v) => v.level === level);
    const i = sameLevel.findIndex((v) => v.id === id);
    const reordered = moveItem(sameLevel, i, dir);
    let k = 0;
    onChange({ ...content, videos: videos.map((v) => (v.level === level ? reordered[k++] : v)) });
  }

  return (
    <div className="flex flex-col gap-6">
      <AddVideo content={content} onChange={onChange} storageReady={storageReady} />

      <Card
        title="Seções do portfólio"
        subtitle="São os filtros do portfólio (Básico, Intermediário...). Crie quantas quiser."
      >
        <div className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {levels.map((level, i) => (
              <motion.div
                key={level.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2"
              >
                <input
                  value={level.label}
                  onChange={(e) => renameLevel(level.id, e.target.value)}
                  className={inputClass}
                  aria-label="Nome da seção"
                />
                <span className="hidden w-20 shrink-0 text-center font-mono text-xs text-steel sm:block">
                  {videos.filter((v) => v.level === level.id).length} vídeo(s)
                </span>
                <IconButton label="Subir" disabled={i === 0} onClick={() => onChange({ ...content, levels: moveItem(levels, i, -1) })}>
                  <ArrowUp size={15} />
                </IconButton>
                <IconButton label="Descer" disabled={i === levels.length - 1} onClick={() => onChange({ ...content, levels: moveItem(levels, i, 1) })}>
                  <ArrowDown size={15} />
                </IconButton>
                <IconButton label="Apagar seção" tone="danger" onClick={() => removeLevel(level.id)}>
                  <Trash2 size={15} />
                </IconButton>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-4 flex gap-2">
          <input
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addLevel()}
            placeholder="Nome da nova seção (ex.: Avançado, Reels, 3D...)"
            className={inputClass}
          />
          <Button onClick={addLevel} disabled={!newLevel.trim()}>
            <Plus size={16} /> Criar
          </Button>
        </div>
      </Card>

      {levels.map((level) => {
        const list = videos.filter((v) => v.level === level.id);
        return (
          <Card key={level.id} title={level.label} subtitle={`${list.length} vídeo(s) nesta seção`}>
            {list.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-ink/15 px-5 py-8 text-center text-sm text-steel">
                Nenhum vídeo ainda. Use “Adicionar vídeo” lá em cima.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                <AnimatePresence initial={false}>
                  {list.map((video, i) => (
                    <motion.div
                      key={video.id}
                      layout
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                      className="flex flex-col gap-3 rounded-2xl border border-ink/10 p-3 sm:flex-row sm:items-center"
                    >
                      <div className="flex min-w-0 flex-1 gap-3">
                        <Thumb url={video.videoUrl} />
                        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2">
                          <input
                            value={video.category}
                            onChange={(e) => updateVideo(video.id, { category: e.target.value })}
                            placeholder="Categoria"
                            className={inputClass}
                            aria-label="Categoria"
                          />
                          <input
                            value={video.duration ?? ""}
                            onChange={(e) => updateVideo(video.id, { duration: e.target.value })}
                            placeholder="Duração (ex.: 0:28)"
                            className={inputClass}
                            aria-label="Duração"
                          />
                          <select
                            value={video.level}
                            onChange={(e) => updateVideo(video.id, { level: e.target.value })}
                            className={`${inputClass} col-span-2 sm:col-span-1`}
                            aria-label="Seção"
                          >
                            {levels.map((l) => (
                              <option key={l.id} value={l.id}>{l.label}</option>
                            ))}
                          </select>
                          <input
                            value={video.videoUrl}
                            onChange={(e) => updateVideo(video.id, { videoUrl: e.target.value })}
                            className={`${inputClass} col-span-2 font-mono text-xs sm:col-span-1`}
                            aria-label="Link do vídeo"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <IconButton
                          label={video.featured ? "Tirar do início" : "Mostrar no início"}
                          tone={video.featured ? "active" : "default"}
                          onClick={() => updateVideo(video.id, { featured: !video.featured })}
                        >
                          <Star size={15} className={video.featured ? "fill-white" : ""} />
                        </IconButton>
                        <IconButton label="Subir" disabled={i === 0} onClick={() => moveVideo(video.id, -1)}>
                          <ArrowUp size={15} />
                        </IconButton>
                        <IconButton label="Descer" disabled={i === list.length - 1} onClick={() => moveVideo(video.id, 1)}>
                          <ArrowDown size={15} />
                        </IconButton>
                        <IconButton label="Remover vídeo" tone="danger" onClick={() => removeVideo(video.id)}>
                          <Trash2 size={15} />
                        </IconButton>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function AddVideo({ content, onChange, storageReady }: Props) {
  const [mode, setMode] = useState<"link" | "file">("link");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Motion Design");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState(content.levels[0]?.id ?? "");
  const [featured, setFeatured] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const categories = Array.from(new Set(content.videos.map((v) => v.category).filter(Boolean)));
  const levelId = content.levels.some((l) => l.id === level) ? level : content.levels[0]?.id ?? "";

  function add(videoUrl: string) {
    onChange({
      ...content,
      videos: [
        ...content.videos,
        {
          id: uid("v"),
          level: levelId,
          category: category.trim() || "Motion Design",
          videoUrl,
          duration: duration.trim() || undefined,
          featured: featured || undefined,
        },
      ],
    });
    setUrl("");
    setDuration("");
    setFeatured(false);
  }

  async function sendFile(file: File) {
    setError("");
    setProgress(0);
    try {
      const safeName = file.name.replace(/[^\w.-]+/g, "-");
      const blob = await upload(`portfolio/${safeName}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        multipart: file.size > 20 * 1024 * 1024,
        onUploadProgress: (e) => setProgress(Math.round(e.percentage)),
      });
      add(blob.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar o arquivo.");
    } finally {
      setProgress(null);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const preview = url ? parseVideo(url) : null;

  return (
    <Card
      title="Adicionar vídeo"
      subtitle="Cole o link do Vimeo/YouTube ou envie o arquivo do vídeo direto daqui."
      className="border-green/30 bg-gradient-to-br from-white to-green-mist"
    >
      <div className="mb-5 inline-flex rounded-full bg-cloud p-1">
        {([
          ["link", "Colar link", Link2],
          ["file", "Enviar arquivo", UploadCloud],
        ] as const).map(([value, label, Icon]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
          >
            {mode === value && (
              <motion.span layoutId="add-mode" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            )}
            <Icon size={15} className={`relative z-10 ${mode === value ? "text-white" : "text-graphite"}`} />
            <span className={`relative z-10 ${mode === value ? "text-white" : "text-graphite"}`}>{label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {mode === "link" ? (
          <Field label="Link do vídeo" className="sm:col-span-2" hint={preview ? `Detectado: ${preview.kind === "file" ? "arquivo de vídeo" : preview.kind === "vimeo" ? "Vimeo" : "YouTube"}` : undefined}>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://vimeo.com/123456789" className={inputClass} />
          </Field>
        ) : (
          <Field label="Arquivo (MP4, WEBM ou MOV, até 500 MB)" className="sm:col-span-2" hint={!storageReady ? "Envio de arquivo só funciona depois de conectar o armazenamento (Blob) no Vercel." : undefined}>
            <input
              ref={fileRef}
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              disabled={!storageReady || progress !== null}
              onChange={(e) => e.target.files?.[0] && sendFile(e.target.files[0])}
              className={`${inputClass} file:mr-3 file:rounded-full file:border-0 file:bg-green file:px-4 file:py-1.5 file:text-sm file:font-medium file:text-white`}
            />
            {progress !== null && (
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
                <motion.div className="h-full bg-green" animate={{ width: `${progress}%` }} />
              </div>
            )}
            {progress !== null && <span className="text-xs text-green-dark">Enviando… {progress}%</span>}
          </Field>
        )}

        <Field label="Seção">
          <select value={levelId} onChange={(e) => setLevel(e.target.value)} className={inputClass}>
            {content.levels.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Categoria (etiqueta no card)">
          <input value={category} onChange={(e) => setCategory(e.target.value)} list="categorias" className={inputClass} />
          <datalist id="categorias">
            {categories.map((c) => <option key={c} value={c} />)}
          </datalist>
        </Field>
        <Field label="Duração (opcional)">
          <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="0:30" className={inputClass} />
        </Field>
        <label className="flex items-center gap-3 self-end rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm text-graphite">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4 accent-green" />
          Mostrar também no início do site
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {mode === "link" && (
        <div className="mt-5 flex justify-end">
          <Button variant="green" onClick={() => add(url.trim())} disabled={!url.trim() || !levelId}>
            <Plus size={16} /> Adicionar à seção
          </Button>
        </div>
      )}
    </Card>
  );
}
