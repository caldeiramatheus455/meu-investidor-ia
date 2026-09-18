import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-emerald-light ${className}`}
      aria-label="Meu Investidor, página inicial"
    >
      <Image
        src="/mascote.png"
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0"
        priority
      />
      <span className="font-heading text-lg font-semibold tracking-tight text-white">
        Meu <span className="text-brand-emerald-light">Investidor</span>
      </span>
      <span className="rounded-full bg-brand-emerald px-2 py-0.5 text-xs font-bold tracking-wide text-white">
        IA
      </span>
    </Link>
  );
}
