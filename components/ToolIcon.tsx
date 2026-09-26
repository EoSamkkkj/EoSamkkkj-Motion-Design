import Image from "next/image";

interface ToolIconProps {
  id: string;
}

const logos: Record<string, { src: string; alt: string }> = {
  figma: { src: "/logos/figma.png", alt: "Figma" },
  "after-effects": { src: "/logos/after-effects.png", alt: "Adobe After Effects" },
  "premiere-pro": { src: "/logos/premiere-pro.png", alt: "Adobe Premiere Pro" },
};

export default function ToolIcon({ id }: ToolIconProps) {
  const logo = logos[id];
  if (!logo) return null;

  return (
    <div className="relative h-11 w-11 overflow-hidden rounded-xl shadow-soft">
      <Image src={logo.src} alt={logo.alt} fill sizes="44px" className="object-cover" />
    </div>
  );
}
