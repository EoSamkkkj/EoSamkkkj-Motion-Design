export const siteConfig = {
  name: "EoSamKkkj",
  title: "EoSamKkkj — Motion Designer",
  description:
    "Portfólio de Sam, Motion Designer especializado em animação, Motion Design e experiências visuais.",
  url: "https://eosamkkkj.com",
  whatsapp: {
    // Número sem formatação, usado nos links wa.me
    phone: "559885881239",
    // Número exibido para humanos
    display: "+55 98 8588-1239",
  },
  nav: [
    { label: "Início", href: "#inicio" },
    { label: "Projetos", href: "#projetos" },
    { label: "Sobre mim", href: "#sobre" },
    { label: "Preços", href: "#precos" },
  ],
  // Deixe vazio até Sam enviar os links reais — nunca inventamos URLs de rede social.
  social: {
    instagram: "https://www.instagram.com/eosamkkkj/",
    tiktok: "https://www.tiktok.com/@eosamkkkj",
    youtube: "https://www.youtube.com/@Eosamkkkj",
  },
};

export type SiteConfig = typeof siteConfig;
