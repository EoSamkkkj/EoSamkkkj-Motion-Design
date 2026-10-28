import { cn } from "@/lib/utils";

// Fundos em movimento contínuo para as seções (só CSS, sem JS):
//  - "dots":   pontinhos verdes deslizando
//  - "grid":   grade técnica andando devagar
//  - "aurora": luz verde girando + keyframes piscando (para fundos escuros)

// posições fixas (sem Math.random) para o HTML do servidor e do navegador baterem
const STARS = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53 + 11) % 100,
  t: 2 + ((i * 7) % 4),
  dl: -((i * 3) % 5),
  big: i % 5 === 0,
}));

export default function MovingBackdrop({
  variant,
  className,
}: {
  variant: "dots" | "grid" | "aurora";
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {variant === "dots" && <div className="bg-dots-move absolute inset-[-40px]" />}
      {variant === "grid" && (
        <div className="bg-grid bg-grid-move absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      )}
      {variant === "aurora" && (
        <>
          <div className="aurora opacity-60" />
          {STARS.map((s, i) => (
            <span
              key={i}
              className={cn("twinkle absolute rounded-[1px]", s.big ? "h-2 w-2 bg-green" : "h-1 w-1 bg-white")}
              style={{ left: `${s.left}%`, top: `${s.top}%`, ["--t" as string]: `${s.t}s`, ["--dl" as string]: `${s.dl}s` }}
            />
          ))}
        </>
      )}
    </div>
  );
}
