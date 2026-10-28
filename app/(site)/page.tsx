import HomeSection from "@/sections/HomeSection";
import ProjetosSection from "@/sections/ProjetosSection";
import SobreSection from "@/sections/SobreSection";
import PrecosSection from "@/sections/PrecosSection";
import { getContent } from "@/lib/content";

export default async function OnePagePage() {
  // Conteúdo editável pelo painel (/admin): seções, vídeos, preços e FAQ.
  const content = await getContent();
  const featured = content.videos.filter((v) => v.featured);

  return (
    <>
      <HomeSection
        levels={content.levels}
        featured={featured.length ? featured.slice(0, 6) : content.videos.slice(0, 6)}
      />
      <ProjetosSection levels={content.levels} videos={content.videos} />
      <SobreSection />
      <PrecosSection plans={content.plans} faq={content.faq} />
    </>
  );
}
