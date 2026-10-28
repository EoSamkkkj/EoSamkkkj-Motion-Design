import { NextResponse } from "next/server";
import {
  adminConfigured,
  checkPassword,
  createSessionToken,
  SESSION_COOKIE,
} from "@/lib/auth";

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "O painel ainda não tem senha configurada no Vercel (ADMIN_PASSWORD)." },
      { status: 503 }
    );
  }

  const { password } = (await request.json().catch(() => ({}))) as { password?: string };

  if (typeof password !== "string" || !checkPassword(password)) {
    // pequena espera para atrapalhar tentativas em massa
    await new Promise((r) => setTimeout(r, 900));
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const { token, maxAge } = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return res;
}
