import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getContentFresh, saveContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }
  return NextResponse.json(await getContentFresh());
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sessão expirada. Entre de novo." }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Conteúdo inválido." }, { status: 400 });
  }
  try {
    const saved = await saveContent(body);
    return NextResponse.json(saved);
  } catch (err) {
    console.error("[admin] erro ao publicar:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erro ao publicar." },
      { status: 500 }
    );
  }
}
