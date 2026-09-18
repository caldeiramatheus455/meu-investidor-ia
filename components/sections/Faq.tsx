import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";

export function Faq() {
  return (
    <section className="bg-brand-darker py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-balance text-center font-heading text-3xl font-bold text-white sm:text-4xl">
            Perguntas frequentes
          </h2>
        </Reveal>
        <div className="mt-12">
          <FaqAccordion />
        </div>
      </div>
    </section>
  );
}
