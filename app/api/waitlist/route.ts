import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import { EMAIL_REGEX, MOMENTO_OPTIONS, type WaitlistRequestBody } from "@/lib/waitlist";

export const runtime = "nodejs";

function sanitize(value: unknown, maxLength = 300): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, maxLength);
}

export async function POST(request: NextRequest) {
  let body: Partial<WaitlistRequestBody>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Requisição inválida." },
      { status: 400 }
    );
  }

  // Honeypot: bots preenchem este campo invisível. Fingimos sucesso sem gravar nada.
  if (sanitize(body.company)) {
    return NextResponse.json({ success: true });
  }

  const email = sanitize(body.email, 254)?.toLowerCase();
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, message: "Informe um e-mail válido." },
      { status: 400 }
    );
  }

  const step = body.step === "details" ? "details" : "email";
  const referrer = sanitize(body.referrer, 500) ?? request.headers.get("referer") ?? undefined;
  const utmSource = sanitize(body.utmSource, 200);
  const utmMedium = sanitize(body.utmMedium, 200);
  const utmCampaign = sanitize(body.utmCampaign, 200);
  const momentoRaw = sanitize(body.momento, 200);
  const momento =
    momentoRaw && (MOMENTO_OPTIONS as readonly string[]).includes(momentoRaw)
      ? momentoRaw
      : undefined;
  const whatsapp = sanitize(body.whatsapp, 30);

  if (!isSupabaseConfigured) {
     
    console.log("[waitlist] (modo dev, Supabase não configurado)", {
      step,
      email,
      momento,
      whatsapp,
      utmSource,
      utmMedium,
      utmCampaign,
      referrer,
      criadoEm: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, dev: true });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { success: false, message: "Não foi possível salvar seu cadastro agora." },
      { status: 500 }
    );
  }

  if (step === "email") {
    const { error } = await supabase.from("waitlist").insert({
      email,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      referrer,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ success: true, alreadyExists: true });
      }
       
      console.error("[waitlist] erro ao inserir", error);
      return NextResponse.json(
        { success: false, message: "Não foi possível salvar seu cadastro agora." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  }

  // step === "details": atualiza (ou cria, se por algum motivo o e-mail ainda não existe)
  const detailsPayload: Record<string, string> = { email };
  if (momento) detailsPayload.momento = momento;
  if (whatsapp) detailsPayload.whatsapp = whatsapp;

  const { error } = await supabase
    .from("waitlist")
    .upsert(detailsPayload, { onConflict: "email" });

  if (error) {
     
    console.error("[waitlist] erro ao atualizar detalhes", error);
    return NextResponse.json(
      { success: false, message: "Não foi possível salvar seus dados agora." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
