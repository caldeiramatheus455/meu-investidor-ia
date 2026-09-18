import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    title: "Você conta seu objetivo",
    description: "E quanto pode guardar por mês. Sem planilha, sem complicação.",
  },
  {
    title: "A IA monta seu plano",
    description: "Simples e na ordem certa: reserva de emergência primeiro, depois o resto.",
  },
  {
    title: "Ela te guia até o primeiro aporte",
    description: "Passo a passo, na corretora que você já tem. E te acompanha depois.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-brand-dark py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-balance text-center font-heading text-3xl font-bold text-white sm:text-4xl">
            Como funciona
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 120}>
              <div className="text-center sm:text-left">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-emerald font-heading text-lg font-bold text-white">
                  {index + 1}
                </span>
                <p className="mt-4 font-heading text-lg font-semibold text-white">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
