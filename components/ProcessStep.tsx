import RevealText from "./RevealText";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  delay?: number;
}

export default function ProcessStep({ number, title, description, delay = 0 }: ProcessStepProps) {
  return (
    <RevealText delay={delay} className="relative flex flex-row items-start gap-4 lg:flex-col">
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-green bg-white font-mono text-sm font-medium text-green-dark">
        {number}
      </div>
      <div className="pt-1 lg:pt-0">
        <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-1.5 max-w-[220px] text-sm leading-relaxed text-graphite">
          {description}
        </p>
      </div>
    </RevealText>
  );
}
