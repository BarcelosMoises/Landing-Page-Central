import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.centraldesolucoes.eng.br"),
  title: {
    default:
      "Central de Soluções — Regularização de Engenharia Civil | AVCB, SPDA e Laudos Técnicos",
    template: "%s | Central de Soluções",
  },
  description:
    "Empresa especializada em regularização de engenharia civil: AVCB, SPDA, laudos técnicos, licenciamento ambiental e vigilância sanitária nos estados ES, MG, RJ e SP.",
  keywords: [
    "regularização engenharia civil",
    "avcb corpo de bombeiros",
    "spda para-raios laudo art",
    "laudo técnico engenharia",
    "licenciamento ambiental",
    "alvará sanitário consultoria",
  ],
  authors: [
    { name: "Durval Ribeiro de Queiroz" },
    { name: "Theyllor Estulano do Espírito Santo" },
  ],
  creator: "Central de Soluções",
  publisher: "Central de Soluções",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Central de Soluções",
    title:
      "Central de Soluções — Regularização de Engenharia Civil | AVCB, SPDA e Laudos Técnicos",
    description:
      "Empresa especializada em regularização de engenharia civil: AVCB, SPDA, laudos técnicos, licenciamento ambiental e vigilância sanitária nos estados ES, MG, RJ e SP.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Central de Soluções — Engenharia Civil e Regularização",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Central de Soluções — Regularização de Engenharia Civil",
    description:
      "AVCB, SPDA, laudos técnicos e licenciamento ambiental em ES, MG, RJ e SP.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.centraldesolucoes.eng.br",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Central de Soluções",
  description:
    "Empresa especializada em regularização de engenharia civil: AVCB, SPDA, laudos técnicos, licenciamento ambiental e vigilância sanitária.",
  url: "https://www.centraldesolucoes.eng.br",
  logo: "https://www.centraldesolucoes.eng.br/logo.png",
  image: "https://www.centraldesolucoes.eng.br/og-image.jpg",
  telephone: "",
  email: "",
  address: {
    "@type": "PostalAddress",
    addressCountry: "BR",
    addressRegion: "ES",
  },
  areaServed: [
    { "@type": "State", name: "Espírito Santo" },
    { "@type": "State", name: "Minas Gerais" },
    { "@type": "State", name: "Rio de Janeiro" },
    { "@type": "State", name: "São Paulo" },
  ],
  employee: [
    {
      "@type": "Person",
      name: "Durval Ribeiro de Queiroz",
      jobTitle:
        "Arquiteto e Urbanista, Engenheiro de Segurança do Trabalho, Engenheiro de Segurança Contra Incêndio e Pânico",
    },
    {
      "@type": "Person",
      name: "Theyllor Estulano do Espírito Santo",
      jobTitle: "Engenheiro Civil, Técnico em Mecânica",
    },
  ],
  knowsAbout: [
    "AVCB",
    "SPDA",
    "Laudos Técnicos",
    "Licenciamento Ambiental",
    "Vigilância Sanitária",
    "Projetos de Combate a Incêndio",
    "Regularização junto ao Corpo de Bombeiros",
    "CLCB",
    "ART",
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="font-body bg-white text-neutral-700 antialiased">
        {children}
      </body>
    </html>
  );
}
