import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function LegalLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-brand-dark pt-28 pb-20 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-white/50">Última atualização: {updatedAt}</p>
          <div className="prose-legal mt-10 space-y-6 text-sm leading-relaxed text-white/80 sm:text-base [&_h2]:mt-8 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
