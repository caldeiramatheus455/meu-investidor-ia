import { Logo } from "@/components/Logo";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-brand-dark/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo />
        <a
          href="#lista-de-espera"
          className="rounded-full bg-brand-emerald px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-emerald-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald-light sm:px-5 sm:text-base"
        >
          Entrar na lista
        </a>
      </div>
    </header>
  );
}
