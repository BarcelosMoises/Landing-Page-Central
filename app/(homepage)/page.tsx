import type { Metadata } from "next";
import { ShieldCheck, FilePenLine, FileCheck2, ArrowDown, ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { NavPrimaria } from "@/components/NavPrimaria";
import { ServicosTabs } from "@/components/ServicosTabs";
import { MetricasEmpresa } from "@/components/MetricasEmpresa";
import { TrustBar } from "@/components/TrustBar";
import { SetoresAtendidos } from "@/components/SetoresAtendidos";
import { MapaAtuacao } from "@/components/MapaAtuacao";
import { Glossario } from "@/components/Glossario";
import { FormularioOrcamento } from "@/components/FormularioOrcamento";
import { getServicosPorCategoria, getWhatsAppUrl, contato } from "@/data/servicos";

export const metadata: Metadata = {
  title: "Central de Soluções | AVCB, SPDA, Laudos e Licenciamento RJ, SP, MG e ES",
  description: "Empresa de engenharia civil especializada em regularização AVCB, SPDA, Vigilância Sanitária e Licenciamento Ambiental em RJ, SP, MG e ES. Engenheiros com ART. Clientes Claro, Ambev, Mercado Livre.",
  keywords: ["regularização engenharia civil", "empresa de engenharia civil RJ SP MG ES", "AVCB SPDA laudo técnico licenciamento ambiental"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "pt_BR", url: "/", siteName: "Central de Soluções",
    title: "Central de Soluções | AVCB, SPDA, Laudos e Licenciamento RJ, SP, MG, ES",
    description: "Empresa de engenharia civil especializada em regularização AVCB, SPDA, Vigilância Sanitária e Licenciamento Ambiental em RJ, SP, MG e ES.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Central de Soluções — Engenharia Civil e Regularização em RJ, SP, MG e ES" }],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org", "@type": "WebSite", name: "Central de Soluções", url: "https://www.centraldesolucoes.eng.br", inLanguage: "pt-BR",
  potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://www.centraldesolucoes.eng.br/?s={search_term_string}" }, "query-input": "required name=search_term_string" },
};

const servicosLegalizacao = getServicosPorCategoria("legalizacao");
const servicosProjetos = getServicosPorCategoria("projeto").filter((servico) => servico.exibirNaTabs !== false);
const servicosLaudos = [...getServicosPorCategoria("laudo"), ...getServicosPorCategoria("instalacao")].filter((servico) => servico.exibirNaTabs !== false);

const PILARES_HERO = [
  { label: "Legalização", descricao: "AVCB, Alvará Sanitário, Licenciamento Ambiental", href: "#servicos", Icone: ShieldCheck },
  { label: "Projetos Técnicos", descricao: "Incêndio, VISA, Hidráulico, Acessibilidade, PGRS", href: "#servicos", Icone: FilePenLine },
  { label: "Laudos Técnicos", descricao: "SPDA, Aterramento, Continuidade, Exigências", href: "#servicos", Icone: FileCheck2 },
] as const;

const whatsappHero = getWhatsAppUrl("Olá! Vim pelo site da Central de Soluções e gostaria de um orçamento.");

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <NavPrimaria />
      <main id="conteudo-principal" aria-label="Página inicial da Central de Soluções">
        <section id="hero" aria-labelledby="hero-heading" className="relative min-h-[100dvh] overflow-hidden sm:min-h-[90vh]">
          <video autoPlay muted loop playsInline aria-hidden="true" poster="/images/portfolio/hero-industrial.jpg" className="absolute inset-0 h-full w-full object-cover object-center">
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div aria-hidden="true" className="absolute inset-0 bg-black/35" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#4f0101]/75 via-[#4f0101]/55 to-[#0a0000]/75" />
          <div className="relative z-10 flex min-h-[100dvh] items-start sm:min-h-[90vh] sm:items-center">
            <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-32 sm:px-6 sm:py-24 lg:px-8">
              <div className="max-w-3xl">
                <p className="mx-auto mb-8 max-w-[calc(100%-1rem)] rounded-full border px-4 py-2.5 text-center text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] text-white sm:mx-0 sm:mb-6 sm:max-w-xl sm:text-left sm:text-xs" style={{ backgroundColor: "color-mix(in srgb, #800000 18%, transparent)", borderColor: "rgba(255, 255, 255, 0.25)" }}>
                  Corpo de Bombeiros · Vigilância Sanitária · Prefeituras · Órgãos Ambientais
                </p>
                <h1 id="hero-heading" className="max-w-[350px] text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] text-white sm:max-w-3xl sm:text-5xl md:text-6xl" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}>
                  Soluções para <span className="block italic sm:inline" style={{ color: "#a30000" }}>legalizar</span>{" "}sua empresa.
                </h1>
                <p className="mt-6 max-w-md text-xl font-medium leading-relaxed text-white/90 sm:mt-4 sm:text-lg md:text-xl" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>Tudo que sua empresa precisa em um só lugar.</p>
                <div className="mt-10 grid max-w-sm grid-cols-3 divide-x divide-white/30 sm:mt-12 sm:flex sm:max-w-none sm:items-center sm:divide-x-0">
                  {PILARES_HERO.map((pilar, index) => (
                    <div key={pilar.label} className="min-w-0 sm:flex sm:items-center">
                      {index > 0 ? <span aria-hidden="true" className="hidden h-10 w-px shrink-0 bg-white/25 sm:mx-5 sm:inline-block" /> : null}
                      <a href={pilar.href} aria-label={`${pilar.label}: ${pilar.descricao}`} className="group flex min-w-0 flex-col items-center px-3 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#4f0101] sm:flex-row sm:gap-3 sm:px-0 sm:text-left">
                        <pilar.Icone className="h-8 w-8 shrink-0 text-white transition-opacity duration-200 group-hover:opacity-80 sm:h-6 sm:w-6" aria-hidden="true" />
                        <span className="mt-2 max-w-[90px] text-[10px] font-semibold uppercase leading-snug tracking-wide text-white sm:mt-0 sm:max-w-none sm:whitespace-nowrap sm:text-sm">
                          {pilar.label}
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:flex-wrap">
                  <a href={whatsappHero} target="_blank" rel="noopener noreferrer" aria-label="Solicitar orçamento via WhatsApp à Central de Soluções" className="relative inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#800000] px-7 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-[#4f0101] hover:scale-[1.01] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto sm:py-3.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    <span>Solicitar Orçamento</span><ArrowRight className="absolute right-5 h-5 w-5" aria-hidden="true" />
                  </a>
                  <a href="#servicos" aria-label="Ver todos os serviços da Central de Soluções" className="inline-flex w-auto items-center justify-center gap-2 rounded-lg border border-white/50 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10 active:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">Ver Serviços <ArrowDown className="h-5 w-5 shrink-0" aria-hidden="true" /></a>
                </div>
              </div>
            </div>
          </div>
          <div aria-label="Telefone de contato" className="absolute bottom-6 left-6 z-10 hidden items-center gap-2 lg:flex">
            <a href={`tel:${contato.telefone.replace(/\D/g, "")}`} className="text-xs text-white/60 transition-colors duration-200 hover:text-white/90">{contato.telefone}</a><span className="text-xs text-white/20">•</span><a href={contato.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 transition-colors duration-200 hover:text-white/90">{contato.instagram}</a>
          </div>
        </section>
        <MetricasEmpresa />
        <TrustBar />
        <section id="servicos" aria-label="Serviços da Central de Soluções"><ServicosTabs legalizacao={servicosLegalizacao} projetos={servicosProjetos} laudos={servicosLaudos} /></section>
        <section id="setores" aria-label="Setores atendidos pela Central de Soluções"><SetoresAtendidos /></section>
        <MapaAtuacao />
        <Glossario />
        <FormularioOrcamento />
      </main>
    </>
  );
}
