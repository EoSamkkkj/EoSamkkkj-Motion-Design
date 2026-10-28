"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Film,
  HelpCircle,
  Loader2,
  LogOut,
  Rocket,
  Tag,
  Undo2,
} from "lucide-react";
import type { SiteContent } from "@/lib/content-types";
import { cn } from "@/lib/utils";
import PortfolioEditor from "./PortfolioEditor";
import PricesEditor from "./PricesEditor";
import FaqEditor from "./FaqEditor";

const tabs = [
  { id: "portfolio", label: "Vídeos", icon: Film },
  { id: "prices", label: "Preços", icon: Tag },
  { id: "faq", label: "Perguntas", icon: HelpCircle },
] as const;

type TabId = (typeof tabs)[number]["id"];

interface Props {
  initial: SiteContent;
  storageReady: boolean;
}

export default function AdminApp({ initial, storageReady }: Props) {
  const [content, setContent] = useState(initial);
  const [published, setPublished] = useState(() => JSON.stringify(initial));
  const [tab, setTab] = useState<TabId>("portfolio");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const dirty = useMemo(() => JSON.stringify(content) !== published, [content, published]);

  // avisa antes de fechar a aba com alterações não publicadas
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function publish() {
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao publicar.");
      setContent(data);
      setPublished(JSON.stringify(data));
      setStatus("done");
      setMessage("Publicado! O site já está atualizado.");
      setTimeout(() => setStatus("idle"), 3500);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Erro ao publicar.");
    }
  }

  async function logout() {
    if (dirty && !confirm("Você tem alterações não publicadas. Sair mesmo assim?")) return;
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-cloud">
      {/* barra superior */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ rotate: -12, scale: 1.1 }} className="relative h-9 w-9">
              <Image src="/logo/logo.png" alt="" fill className="object-contain" />
            </motion.div>
            <div className="leading-tight">
              <p className="font-display font-semibold tracking-tight text-ink">Painel</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-steel">
                {dirty ? "alterações não publicadas" : "tudo publicado"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm text-graphite hover:text-green-dark sm:flex"
            >
              Ver site <ExternalLink size={14} />
            </a>
            {dirty && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => confirm("Desfazer tudo que ainda não foi publicado?") && setContent(JSON.parse(published))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-graphite hover:text-ink"
                aria-label="Desfazer alterações"
                title="Desfazer alterações"
              >
                <Undo2 size={16} />
              </motion.button>
            )}
            <motion.button
              type="button"
              onClick={publish}
              disabled={!dirty || status === "saving" || !storageReady}
              whileHover={{ scale: dirty ? 1.04 : 1 }}
              whileTap={{ scale: dirty ? 0.95 : 1 }}
              className={cn(
                "relative flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors",
                dirty && storageReady ? "bg-green shadow-glow hover:bg-green-dark" : "bg-ink/30"
              )}
            >
              {status === "saving" ? <Loader2 size={16} className="animate-spin" /> : <Rocket size={16} />}
              Publicar
              {dirty && <span className="publish-shine pointer-events-none absolute inset-0" />}
            </motion.button>
            <button
              type="button"
              onClick={logout}
              className="flex h-10 w-10 items-center justify-center rounded-full text-steel hover:text-ink"
              aria-label="Sair"
              title="Sair"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* abas */}
        <nav className="mx-auto flex max-w-5xl gap-1 px-4 pb-2 sm:px-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className="relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
            >
              {tab === id && (
                <motion.span layoutId="admin-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <Icon size={15} className={cn("relative z-10", tab === id ? "text-green-light" : "text-steel")} />
              <span className={cn("relative z-10", tab === id ? "text-white" : "text-graphite")}>{label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        {!storageReady && (
          <div className="mb-6 flex gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <AlertTriangle size={18} className="mt-0.5 shrink-0" />
            <p>
              O armazenamento ainda não está conectado, então dá pra mexer mas não dá pra publicar.
              No Vercel: projeto → <strong>Storage</strong> → <strong>Create Database</strong> →{" "}
              <strong>Blob</strong> → conectar a este projeto. Depois faça um novo deploy.
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            {tab === "portfolio" && <PortfolioEditor content={content} onChange={setContent} storageReady={storageReady} />}
            {tab === "prices" && <PricesEditor content={content} onChange={setContent} />}
            {tab === "faq" && <FaqEditor content={content} onChange={setContent} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* aviso de publicação */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        <AnimatePresence>
          {(status === "done" || status === "error") && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className={cn(
                "pointer-events-auto flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-2xl",
                status === "done" ? "bg-green" : "bg-red-500"
              )}
            >
              {status === "done" ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
              {message}
              {status === "error" && (
                <button type="button" onClick={() => setStatus("idle")} className="ml-2 underline">
                  ok
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
