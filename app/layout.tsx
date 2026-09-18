import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import Script from "next/script";
import { META_PIXEL_ID, GA_MEASUREMENT_ID } from "@/lib/analytics";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://meuinvestidor.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Meu Investidor | A IA que te leva ao primeiro investimento",
  description:
    "A Meu Investidor é a IA que te guia do zero ao primeiro aporte e te acompanha depois, sem vender nada. Entre na lista de espera.",
  keywords: [
    "investir",
    "primeiro investimento",
    "educação financeira",
    "Tesouro Direto",
    "reserva de emergência",
    "IA investimentos",
  ],
  openGraph: {
    title: "Meu Investidor | A IA que te leva ao primeiro investimento",
    description:
      "A IA que te guia do zero ao primeiro aporte e te acompanha depois, sem vender nada.",
    url: siteUrl,
    siteName: "Meu Investidor",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/mascote.png",
        width: 1024,
        height: 1024,
        alt: "Mascote da Meu Investidor, uma capivara de gravata verde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meu Investidor | A IA que te leva ao primeiro investimento",
    description:
      "A IA que te guia do zero ao primeiro aporte e te acompanha depois, sem vender nada.",
    images: ["/mascote.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-dark text-white font-body">
        {children}

        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        {META_PIXEL_ID && (
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
