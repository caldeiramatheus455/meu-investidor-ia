"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EMAIL_REGEX, MOMENTO_OPTIONS } from "@/lib/waitlist";
import { trackLead } from "@/lib/analytics";

type Step = "email" | "details" | "done";

interface AttributionData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
}

export function WaitlistForm({ id }: { id?: string }) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [momento, setMomento] = useState<string | null>(null);
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const attribution = useRef<AttributionData>({});
  const submittingRef = useRef(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      attribution.current = {
        utmSource: params.get("utm_source") ?? undefined,
        utmMedium: params.get("utm_medium") ?? undefined,
        utmCampaign: params.get("utm_campaign") ?? undefined,
        referrer: document.referrer || undefined,
      };
    } catch {
      // ambiente sem window/document (nunca deve ocorrer no client)
    }
  }, []);

  async function handleEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return;

    const trimmedEmail = email.trim();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("Digite um e-mail válido para continuar.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const honeypot = String(formData.get("company") ?? "");

    submittingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "email",
          email: trimmedEmail,
          company: honeypot,
          ...attribution.current,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message ?? "Não foi possível concluir seu cadastro agora. Tente novamente.");
        return;
      }

      trackLead();

      if (data.alreadyExists) {
        setAlreadyExists(true);
        setStep("done");
      } else {
        setStep("details");
      }
    } catch {
      setError("Não foi possível concluir seu cadastro agora. Verifique sua conexão e tente de novo.");
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  }

  async function sendDetails(finalMomento: string | null, finalWhatsapp: string) {
    if (!finalMomento && !finalWhatsapp.trim()) {
      setStep("done");
      return;
    }

    if (submittingRef.current) return;
    submittingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: "details",
          email: email.trim(),
          momento: finalMomento ?? undefined,
          whatsapp: finalWhatsapp.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.message ?? "Não foi possível salvar essas informações agora.");
        return;
      }
      setStep("done");
    } catch {
      setError("Não foi possível salvar essas informações agora.");
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  }

  if (step === "done") {
    return (
      <div
        id={id}
        role="status"
        className="flex flex-col items-center gap-4 rounded-2xl bg-brand-mint px-6 py-8 text-center text-brand-darker"
      >
        <Image
          src="/mascote.png"
          alt=""
          width={80}
          height={80}
          className="h-20 w-20"
        />
        <p className="font-heading text-xl font-semibold">
          {alreadyExists
            ? "Você já está na nossa lista!"
            : "Pronto! Você está na lista."}
        </p>
        <p className="max-w-sm text-sm text-brand-darker/80">
          {alreadyExists
            ? "Pode ficar tranquilo, já vamos te avisar assim que a Meu Investidor for lançada."
            : "Vamos te avisar em primeira mão."}
        </p>
      </div>
    );
  }

  if (step === "details") {
    return (
      <div id={id} className="rounded-2xl bg-brand-mint px-6 py-6 text-brand-darker sm:px-8 sm:py-8">
        <p className="font-heading text-lg font-semibold">Qual é o seu momento?</p>
        <p className="mt-1 text-sm text-brand-darker/70">
          Isso é opcional, mas nos ajuda a te ajudar melhor.
        </p>
        <fieldset className="mt-4">
          <legend className="sr-only">Qual é o seu momento?</legend>
          <div className="flex flex-wrap gap-2">
            {MOMENTO_OPTIONS.map((option) => (
              <label key={option} className="cursor-pointer">
                <input
                  type="radio"
                  name="momento"
                  value={option}
                  checked={momento === option}
                  onChange={() => setMomento(option)}
                  className="peer sr-only"
                />
                <span className="inline-block rounded-full border border-brand-dark/20 bg-white px-4 py-2 text-sm font-medium transition-colors peer-checked:border-brand-emerald peer-checked:bg-brand-emerald peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-emerald">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-5">
          <label htmlFor="whatsapp" className="text-sm font-medium">
            WhatsApp (opcional)
          </label>
          <input
            id="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 91234-5678"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="mt-1 w-full rounded-lg border border-brand-dark/20 bg-white px-4 py-2.5 text-brand-darker placeholder:text-brand-darker/40 focus:border-brand-emerald focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald"
          />
          <p className="mt-1 text-xs text-brand-darker/60">Só para avisar do lançamento.</p>
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => sendDetails(momento, whatsapp)}
            className="rounded-full bg-brand-emerald px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          >
            {loading ? "Enviando..." : "Concluir"}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => setStep("done")}
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-brand-darker/70 transition-colors hover:text-brand-darker disabled:cursor-not-allowed disabled:opacity-60"
          >
            Pular
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleEmailSubmit}
      noValidate
      className="flex flex-col gap-3 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <label htmlFor="email" className="sr-only">
          Seu melhor e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="seuemail@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3 text-white placeholder:text-white/50 focus:border-brand-emerald-light focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-emerald-light"
        />
        {/* honeypot anti-spam: campo invisível para humanos, visível para bots */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="company">Não preencha este campo</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        {error && (
          <p role="alert" className="mt-2 text-sm font-medium text-red-300">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="shrink-0 rounded-full bg-brand-emerald px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-emerald-light disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald-light sm:text-base"
      >
        {loading ? "Enviando..." : "Quero entrar na lista"}
      </button>
    </form>
  );
}
