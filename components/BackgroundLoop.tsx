import { cn } from "@/lib/utils";

interface BackgroundLoopProps {
  src: string;
  className?: string;
  eager?: boolean;
}

/**
 * Fundo decorativo em loop (GIF do próprio Sam), sempre em opacidade baixa
 * e com um filtro de cor que puxa o vídeo para o verde da identidade visual
 * do site — para ficar perceptível como textura, sem competir com o
 * conteúdo. Puramente decorativo: aria-hidden e sem interação.
 */
export default function BackgroundLoop({ src, className, eager = false }: BackgroundLoopProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading={eager ? "eager" : "lazy"}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.08] mix-blend-multiply",
        "[filter:grayscale(1)_sepia(0.65)_hue-rotate(75deg)_saturate(3.2)_brightness(1.05)]",
        className
      )}
    />
  );
}
