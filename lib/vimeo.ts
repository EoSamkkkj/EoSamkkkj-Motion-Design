/**
 * Extrai o ID numérico de uma URL do Vimeo, ex.:
 * "https://vimeo.com/1228911101?share=copy" -> "1228911101"
 */
export function getVimeoId(url: string): string {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : url;
}

/**
 * Iframe usado no preview em hover: sem controles, em loop e mudo.
 * O parâmetro background=1 é o modo do próprio Vimeo pensado exatamente
 * para pré-visualizações silenciosas, sem UI de player.
 */
export function vimeoPreviewSrc(id: string): string {
  const params = new URLSearchParams({
    background: "1",
    autoplay: "1",
    loop: "1",
    muted: "1",
    autopause: "0",
    dnt: "1",
  });
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}

/**
 * Iframe usado dentro do modal: player completo, com controles e som.
 */
export function vimeoPlayerSrc(id: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    title: "0",
    byline: "0",
    portrait: "0",
    dnt: "1",
  });
  return `https://player.vimeo.com/video/${id}?${params.toString()}`;
}

/**
 * Thumbnail estático via vumbnail.com (serviço público que gera a capa
 * de qualquer vídeo do Vimeo a partir do ID, sem precisar de autenticação).
 */
export function vimeoThumbnailSrc(id: string): string {
  return `https://vumbnail.com/${id}.jpg`;
}
