import Image from "next/image";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Reveal } from "@/components/Reveal";

export function FinalCta() {
  return (
    <section className="bg-brand-dark py-20 sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <Reveal>
          <Image
            src="/mascote.png"
            alt="Mascote da Meu Investidor acenando e sorrindo"
            width={140}
            height={140}
            className="mx-auto h-28 w-28 sm:h-36 sm:w-36"
          />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-balance font-heading text-3xl font-bold text-white sm:text-4xl">
            Seja um dos primeiros a investir com a Meu Investidor
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 w-full max-w-md">
            <WaitlistForm />
            <p className="mt-3 text-sm text-white/60">
              Grátis para entrar na lista. Sem spam. Sem cobrar nada agora.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
