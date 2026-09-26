import SectionHeading from "@/components/SectionHeading";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import RevealText from "@/components/RevealText";
import SectionReveal from "@/components/SectionReveal";
import { createWhatsAppLinkDefault, whatsappMessages } from "@/lib/whatsapp";

export default function ProjetosSection() {
  return (
    <SectionReveal id="projetos" className="bg-cloud/60">
      <div className="px-6 pb-12 pt-20 sm:px-8 sm:pt-28 lg:px-12">
        <div className="mx-auto max-w-content">
          <SectionHeading
            eyebrow="Portfólio"
            headline={
              <>
                Veja meus
                <br />
                trabalhos.
              </>
            }
            text="Uma seleção dos meus trabalhos em Motion Design, animação e projetos visuais."
          />
        </div>
      </div>

      <div className="mx-auto max-w-content px-6 pb-16 sm:px-8 lg:px-12">
        <ProjectsExplorer />

        <RevealText
          as="p"
          className="mt-10 max-w-2xl text-sm leading-relaxed text-steel"
        >
          Os trabalhos apresentados representam diferentes níveis de produção.
          Cada projeto é desenvolvido de acordo com sua proposta, duração e
          complexidade.
        </RevealText>
      </div>

      <div className="border-t border-ink/10 bg-green-mist">
        <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-6 py-20 text-center sm:px-8 sm:py-28 lg:px-12">
          <SectionHeading
            align="center"
            headline="Gostou do que viu?"
            text="Vamos transformar sua ideia em movimento."
          />
          <WhatsAppCTA
            href={createWhatsAppLinkDefault(whatsappMessages.geral)}
            cursorLabel="WhatsApp"
          >
            Falar comigo
          </WhatsAppCTA>
        </div>
      </div>
    </SectionReveal>
  );
}
