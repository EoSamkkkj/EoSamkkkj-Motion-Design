import type { Tool } from "@/data/tools";
import RevealText from "./RevealText";
import ToolIcon from "./ToolIcon";

export default function ToolCard({ tool, delay = 0 }: { tool: Tool; delay?: number }) {
  return (
    <RevealText
      delay={delay}
      className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-7"
    >
      <ToolIcon id={tool.id} />
      <span className="font-mono text-[11px] uppercase tracking-widest text-green-dark">
        {tool.category}
      </span>
      <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
        {tool.title}
      </h3>
      <p className="text-sm leading-relaxed text-graphite">{tool.description}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-green-mist px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-green-dark"
          >
            {tag}
          </span>
        ))}
      </div>
    </RevealText>
  );
}
