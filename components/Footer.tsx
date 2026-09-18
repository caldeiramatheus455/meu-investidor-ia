import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-darker py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
          <Logo />
          <nav
            aria-label="Links do rodapé"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70"
          >
            <a
              href="https://www.instagram.com/meuinvestidor.ia"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-emerald-light"
            >
              @meuinvestidor.ia
            </a>
            <Link
              href="/privacidade"
              className="rounded hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-emerald-light"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos"
              className="rounded hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-emerald-light"
            >
              Termos
            </Link>
          </nav>
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-white/45 sm:text-left">
          A Meu Investidor tem caráter educacional e informativo. Não somos
          corretora nem consultoria de valores mobiliários registrada, não
          custodiamos recursos de clientes e não recomendamos ativos
          específicos. Investimentos envolvem riscos e rentabilidade passada
          não garante resultados futuros.
        </p>

        <p className="mt-4 text-xs text-white/30">
          © {new Date().getFullYear()} Meu Investidor. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
