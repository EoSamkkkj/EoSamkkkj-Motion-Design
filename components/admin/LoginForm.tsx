"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import { Lock, Loader2 } from "lucide-react";

export default function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(0);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.refresh();
      return;
    }
    const data = await res.json().catch(() => ({}));
    setError(data.error ?? "Não foi possível entrar.");
    setShake((n) => n + 1);
    setLoading(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6">
      <div className="bg-grid-light absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="admin-orb absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green/25 blur-3xl" />

      <motion.form
        key={shake}
        onSubmit={submit}
        initial={shake ? { x: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
        animate={shake ? { x: [0, -12, 12, -8, 8, 0] } : { opacity: 1, y: 0, scale: 1 }}
        transition={shake ? { duration: 0.45 } : { type: "spring", stiffness: 220, damping: 20 }}
        className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-white backdrop-blur-xl"
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="relative h-11 w-11">
            <Image src="/logo/logo-white.png" alt="" fill className="object-contain" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">Painel do site</p>
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/50">EoSamKkkj</p>
          </div>
        </div>

        {configured ? (
          <>
            <label htmlFor="password" className="mb-2 block text-sm text-white/70">
              Senha
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 py-3.5 pl-11 pr-4 text-white outline-none transition focus:border-green focus:bg-white/10"
              />
            </div>
            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
            <motion.button
              type="submit"
              disabled={loading || !password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green py-3.5 font-medium text-white shadow-glow transition-colors hover:bg-green-dark disabled:opacity-50"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Entrar
            </motion.button>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-white/70">
            O painel ainda não tem senha. No Vercel, abra o projeto →{" "}
            <strong className="text-white">Settings → Environment Variables</strong> e crie a
            variável <code className="rounded bg-white/10 px-1.5 py-0.5 text-green-light">ADMIN_PASSWORD</code>{" "}
            com a senha que você quiser. Depois faça um novo deploy.
          </p>
        )}
      </motion.form>
    </main>
  );
}
