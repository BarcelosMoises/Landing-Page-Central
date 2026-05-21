import { getWhatsAppUrl, contato } from "@/data/servicos";
import { CrosshairDecor } from "@/components/CrosshairDecor";

// ─── Mensagem pré-preenchida para o WhatsApp ──────────────────────────────────
const MENSAGEM_WHATSAPP =
  "Olá! Vim pelo site da Central de Soluções e gostaria de solicitar um orçamento.";

// ─── Trust signals ─────────────────────────────────────────────────────────────
const TRUST_SIGNALS = [
  {
    id: "art",
    label: "Engenheiros com ART",
    // Ícone: arquivo/certificado — coerente com responsabilidade técnica
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: "estados",
    label: "4 estados atendidos",
    // Ícone: mapa/localização
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 flex-shrink-0"
        aria-hidden="true"
      >
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    id: "experiencia",
    label: "Mais de 10 anos de experiência",
    // Ícone: escudo/confiança
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 flex-shrink-0"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
] as const;

// ─── Componente principal (Server Component — sem "use client") ───────────────

export function FormularioContato() {
  const whatsappUrl = getWhatsAppUrl(MENSAGEM_WHATSAPP);

  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="relative bg-[#1a0000] py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-8 max-w-2xl mx-auto">

          {/* Badge de categoria */}
          {/* text-white/70 sobre bg-[#1a0000] → contraste ~10.4:1 ✓ WCAG AAA */}
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Orçamento gratuito
          </p>

          {/* Heading principal */}
          {/* #fff sobre #1a0000 → contraste ~18.1:1 ✓ WCAG AAA */}
          <h2
            id="contato-heading"
            className="font-heading text-2xl md:text-4xl font-bold text-white leading-tight -mt-4"
          >
            Solicite um Orçamento<br className="hidden sm:block" /> Sem Compromisso
          </h2>

          {/* Subtexto */}
          {/*
            #c4a8a8 (text-warm-secondary) sobre #1a0000 → contraste ~6.3:1 ✓ WCAG AA.
            Nunca usar text-neutral-400 (#9ca3af) sobre #1a0000 — disssonância de temperatura.
          */}
          <p className="text-lg leading-relaxed -mt-2" style={{ color: "#c4a8a8" }}>
            Atendemos indústrias, galpões logísticos, empresas de telecom e
            energia solar em ES, MG, RJ e SP. Retorno em até 1 dia útil.
          </p>

          {/* Botão CTA primário — WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Solicitar orçamento pelo WhatsApp da Central de Soluções — abre em nova aba"
            className="inline-flex items-center gap-3 bg-[#800000] hover:bg-[#4f0101] active:bg-[#4f0101] text-white font-semibold text-base px-8 py-4 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0000]"
          >
            {/* Ícone WhatsApp SVG inline */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Solicite um Orçamento
          </a>

          {/* Microcopy de confiança abaixo do botão */}
          {/* text-white/50 — informação terciária, não precisa atingir AA */}
          <p className="text-sm text-white/50 -mt-4">
            Sem compromisso · Resposta em até 1 dia útil
          </p>

          {/* Divisor sutil */}
          <div className="w-16 border-t border-white/10" aria-hidden="true" />

          {/* Trust signals — 3 itens em linha */}
          <ul
            role="list"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          >
            {TRUST_SIGNALS.map((signal) => (
              <li
                key={signal.id}
                className="flex items-center gap-2"
                style={{ color: "#c4a8a8" }}
              >
                {signal.icon}
                <span className="text-sm font-medium">{signal.label}</span>
              </li>
            ))}
          </ul>

          {/* Contatos diretos — WhatsApp e e-mail */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 pt-2">

            {/* Link WhatsApp direto (sem mensagem pré-preenchida) */}
            <a
              href={`https://wa.me/${contato.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Entrar em contato pelo WhatsApp da Central de Soluções — abre em nova aba"
              className="inline-flex items-center gap-3 text-white hover:text-white/80 transition-colors duration-150"
            >
              <span
                aria-hidden="true"
                className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <span className="font-semibold text-base">{contato.telefone}</span>
            </a>

            {/* Link de e-mail */}
            {/*
              #c4a8a8 sobre #1a0000 → contraste ~6.3:1 ✓ WCAG AA.
            */}
            <a
              href={`mailto:${contato.email}`}
              aria-label={`Enviar e-mail para ${contato.email}`}
              className="inline-flex items-center gap-3 hover:text-white transition-colors duration-150 text-sm"
              style={{ color: "#c4a8a8" }}
            >
              <span
                aria-hidden="true"
                className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              {contato.email}
            </a>

          </div>
        </div>
      </div>

      {/* Assinatura visual do cliente — obrigatório em fundos #1a0000 (DESIGN.md) */}
      <CrosshairDecor />
    </section>
  );
}
