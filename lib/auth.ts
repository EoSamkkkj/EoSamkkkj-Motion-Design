import "server-only";
import { cookies } from "next/headers";

// Sessão do painel: um cookie httpOnly com a validade assinada por HMAC.
// A senha fica só na variável de ambiente ADMIN_PASSWORD (no Vercel),
// nunca no código nem no navegador.

export const SESSION_COOKIE = "eosam_admin";
const SESSION_DAYS = 7;

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

const enc = new TextEncoder();

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Buffer.from(sig).toString("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  let diff = ab.length ^ bb.length;
  for (let i = 0; i < Math.max(ab.length, bb.length); i++) {
    diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && safeEqual(input, expected!);
}

export async function createSessionToken(): Promise<{ token: string; maxAge: number }> {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  const exp = String(Date.now() + maxAge * 1000);
  return { token: `${exp}.${await hmac(exp)}`, maxAge };
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token || !adminConfigured()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, await hmac(exp));
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}
