"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { createWhatsAppLinkDefault, whatsappMessages } from "@/lib/whatsapp";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";
import WhatsAppCTA from "./WhatsAppCTA";

const sectionIds = siteConfig.nav.map((item) => item.href.replace("#", ""));

export default function Header() {
  const active = useActiveSection(sectionIds, sectionIds[0]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const veilControls = useAnimationControls();
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  async function goToSection(id: string, e: React.MouseEvent) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    setMenuOpen(false);

    if (reduceMotionRef.current) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
      history.replaceState(null, "", `#${id}`);
      return;
    }

    await veilControls.start({
      scaleY: 1,
      transition: { duration: 0.26, ease: [0.76, 0, 0.24, 1] },
    });
    target.scrollIntoView({ behavior: "auto", block: "start" });
    history.replaceState(null, "", `#${id}`);
    await veilControls.start({
      scaleY: 0,
      transition: { duration: 0.34, ease: [0.16, 1, 0.3, 1], delay: 0.03 },
    });
  }

  return (
    <>
      {/* transição estilo "motion design" ao trocar de seção pelo menu */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={veilControls}
        style={{ originY: 0 }}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[95] bg-green will-change-transform"
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-300",
          scrolled || menuOpen ? "glass shadow-soft" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[76px] max-w-content items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#inicio"
            onClick={(e) => goToSection("inicio", e)}
            data-cursor="Início"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
            aria-label={`${siteConfig.name} — voltar ao início`}
          >
            <Image
              src="/logo/logo.png"
              alt={siteConfig.name}
              width={40}
              height={40}
              priority
              className="h-8 w-8 shrink-0 rounded-xl object-contain sm:h-10 sm:w-10"
            />
            <span className="truncate font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
              {siteConfig.name}
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Navegação principal">
            {siteConfig.nav.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => goToSection(id, e)}
                  data-cursor={item.label}
                  className={cn(
                    "relative py-2 text-sm font-medium transition-colors",
                    isActive ? "text-ink" : "text-graphite hover:text-ink"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-green"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <WhatsAppCTA
              href={createWhatsAppLinkDefault(whatsappMessages.geral)}
              cursorLabel="WhatsApp"
              className="px-6 py-3 text-xs uppercase tracking-[0.15em]"
            >
              Falar comigo
            </WhatsAppCTA>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(2% at calc(100% - 40px) 38px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 38px)" }}
            exit={{ clipPath: "circle(2% at calc(100% - 40px) 38px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-white pt-[76px] md:hidden"
          >
            <nav
              className="flex flex-1 flex-col items-start justify-center gap-1.5 px-8 sm:gap-2"
              aria-label="Navegação mobile"
            >
              {siteConfig.nav.map((item, i) => {
                const id = item.href.replace("#", "");
                const isActive = active === id;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 28 }}
                    transition={{
                      delay: 0.08 * i,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => goToSection(id, e)}
                      className={cn(
                        "font-display text-4xl font-semibold tracking-tight transition-colors sm:text-5xl",
                        isActive ? "text-green-dark" : "text-ink"
                      )}
                    >
                      {item.label}
                    </a>
                  </motion.div>
                );
              })}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-ink/10 px-8 py-8"
            >
              <WhatsAppCTA
                href={createWhatsAppLinkDefault(whatsappMessages.geral)}
                className="w-full py-4 text-sm uppercase tracking-[0.15em]"
                cursorLabel="WhatsApp"
              >
                Falar comigo
              </WhatsAppCTA>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

