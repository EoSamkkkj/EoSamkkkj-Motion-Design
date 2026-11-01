import HomeSection from "@/sections/HomeSection";
import ProjetosSection from "@/sections/ProjetosSection";
import SobreSection from "@/sections/SobreSection";
import PrecosSection from "@/sections/PrecosSection";
import { getContent } from "@/lib/content";
import { withVideoMeta } from "@/lib/video-meta";

export default async function OnePagePage() {
  // Conteúdo editável pelo painel (/admin): seções, vídeos, preços e FAQ.
  const content = await getContent();
  const videos = await withVideoMeta(content.videos);
  const featured = videos.filter((v) => v.featured);

  return (
    <>
      <HomeSection
        levels={content.levels}
        featured={featured.length ? featured : videos.slice(0, 8)}
      />
      <ProjetosSection levels={content.levels} videos={videos} />
      <SobreSection />
      <PrecosSection plans={content.plans} faq={content.faq} />
    </>
  );
}
