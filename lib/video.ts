// Entende de onde vem cada vídeo do portfólio — Vimeo, YouTube ou um
// arquivo enviado pelo painel — e devolve capa, preview e player certos.

export type VideoSource =
  | { kind: "vimeo"; id: string }
  | { kind: "youtube"; id: string }
  | { kind: "file"; url: string };

export function parseVideo(url: string): VideoSource {
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: "vimeo", id: vimeo[1] };
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  if (yt) return { kind: "youtube", id: yt[1] };
  return { kind: "file", url };
}

/**
 * Capa estática que dá pra montar só com o link. Vimeo não tem uma URL
 * fixa: a capa vem do oEmbed (lib/video-meta no site). Arquivos usam o
 * 1º frame do próprio <video>.
 */
export function videoThumbnail(src: VideoSource): string | null {
  if (src.kind === "youtube") return `https://i.ytimg.com/vi/${src.id}/hqdefault.jpg`;
  return null;
}

/** Iframe de preview mudo, em loop e sem controles. */
export function videoPreviewEmbed(src: VideoSource): string | null {
  if (src.kind === "vimeo") {
    const p = new URLSearchParams({ background: "1", autoplay: "1", loop: "1", muted: "1", autopause: "0", dnt: "1" });
    return `https://player.vimeo.com/video/${src.id}?${p}`;
  }
  if (src.kind === "youtube") {
    const p = new URLSearchParams({ autoplay: "1", mute: "1", controls: "0", loop: "1", playlist: src.id, playsinline: "1", modestbranding: "1", rel: "0" });
    return `https://www.youtube-nocookie.com/embed/${src.id}?${p}`;
  }
  return null;
}

/** Iframe do player completo, com som (usado no modal). */
export function videoPlayerEmbed(src: VideoSource): string | null {
  if (src.kind === "vimeo") {
    const p = new URLSearchParams({ autoplay: "1", title: "0", byline: "0", portrait: "0", dnt: "1" });
    return `https://player.vimeo.com/video/${src.id}?${p}`;
  }
  if (src.kind === "youtube") {
    const p = new URLSearchParams({ autoplay: "1", rel: "0", modestbranding: "1", playsinline: "1" });
    return `https://www.youtube-nocookie.com/embed/${src.id}?${p}`;
  }
  return null;
}
