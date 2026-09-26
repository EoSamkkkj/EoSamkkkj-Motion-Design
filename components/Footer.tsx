import Image from "next/image";
import { Instagram, Youtube } from "lucide-react";
import { siteConfig } from "@/config/site";
import { createWhatsAppLinkDefault, whatsappMessages } from "@/lib/whatsapp";

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.6 5.82c-.9-.78-1.45-1.9-1.5-3.14h-3.13v13.36c0 1.53-1.24 2.77-2.77 2.77a2.77 2.77 0 0 1-2.77-2.77c0-1.62 1.4-2.93 3.06-2.76v-3.16c-3.4-.28-6.2 2.36-6.2 5.92 0 3.32 2.7 6.02 6.02 6.02 3.32 0 6.02-2.7 6.02-6.02V9.15a7.9 7.9 0 0 0 4.6 1.47V7.5c-1.1 0-2.13-.35-2.98-.94a5.9 5.9 0 0 1-1.35-.74Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { instagram, tiktok, youtube } = siteConfig.social;
  const socialLinks = [
    { href: instagram, label: "Instagram", icon: <Instagram size={18} /> },
    { href: tiktok, label: "TikTok", icon: <TikTokIcon /> },
    { href: youtube, label: "YouTube", icon: <Youtube size={18} /> },
  ].filter((s) => s.href);

  return (
    <footer className="relative border-t border-ink/10 bg-white">
      <div className="mx-auto flex max-w-content flex-col gap-10 px-6 py-14 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="flex items-center gap-3">
            <Image
              src="/logo/logo.png"
              alt={siteConfig.name}
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-contain"
            />
            <span className="font-display text-base font-semibold tracking-tight text-ink">
              {siteConfig.name}
            </span>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Navegação do rodapé">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-graphite transition-colors hover:text-green-dark"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={createWhatsAppLinkDefault(whatsappMessages.geral)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-graphite transition-colors hover:text-green-dark"
            >
              WhatsApp — {siteConfig.whatsapp.display}
            </a>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="shrink-0 text-graphite transition-colors hover:text-green-dark"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="font-mono text-xs text-steel">
          © {year} {siteConfig.name}. Motion Design sob medida.
        </p>
      </div>
    </footer>
  );
}
