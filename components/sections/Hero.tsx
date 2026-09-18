import Image from "next/image";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-dark pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 sm:px-6 lg:flex-row lg:gap-16">
        <div className="w-full max-w-xl text-center lg:text-left">
          <Reveal>
            <h1 className="text-balance font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Seu primeiro investimento começa aqui.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-5 text-balance text-lg leading-relaxed text-white/80 sm:text-xl">
              A Meu Investidor é a IA que te guia do zero ao primeiro aporte e
              te acompanha depois. Sem vender nada.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8">
              <WaitlistForm id="lista-de-espera" />
              <p className="mt-3 text-sm text-white/60">
                Grátis para entrar na lista. Sem spam. Sem cobrar nada agora.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={150} className="w-full max-w-xs shrink-0 sm:max-w-sm lg:max-w-md">
          <Image
            src="/mascote.png"
            alt="Mascote da Meu Investidor, uma capivara fofa de gravata verde com um broto na cabeça"
            width={480}
            height={480}
            priority
            className="mx-auto h-auto w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
