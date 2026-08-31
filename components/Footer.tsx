// components/Footer.tsx
// Footer compartilhado. O fundo é tingido pelo accent da categoria via
// color-mix sobre #1a0000 — mesmo padrão do CtaFinal (ver AGENTS.md).

import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer
      className="relative"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--color-service-accent, #800000) 20%, #1a0000)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Image src="/images/logo.png" alt="Símbolo da Central de Soluções - mãos unidas" width={32} height={32} />
              <span className="font-heading font-bold text-white text-lg leading-none tracking-tight">
                Central de <span style={{ color: "var(--color-service-accent, #800000)" }}>Soluções</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: "#c4a8a8" }}>
              Engenharia de regularização para indústrias, galpões e telecom. Atendemos RJ, SP, MG e ES, além de outros estados sob consulta, com responsabilidade técnica real.
            </p>
            <div className="mt-5 space-y-2 text-sm" style={{ color: "#e0c8c8" }}>
              <p>(22) 98112-1315</p>
              <p>centralsolu@outlook.com</p>
              <p>@centraldesolucoes</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white mb-5">Serviços</h3>
            <nav className="space-y-3 text-sm" style={{ color: "#c4a8a8" }} aria-label="Serviços">
              <Link href="/avcb-corpo-de-bombeiros" className="block hover:text-white transition-colors">Corpo de Bombeiros</Link>
              <Link href="/vigilancia-sanitaria" className="block hover:text-white transition-colors">Vigilância Sanitária</Link>
              <Link href="/licenciamento-ambiental" className="block hover:text-white transition-colors">Meio Ambiente</Link>
              <Link href="/regularizacao-prefeitura" className="block hover:text-white transition-colors">Prefeitura</Link>
              <Link href="/laudos-tecnicos" className="block hover:text-white transition-colors">Laudos Técnicos</Link>
              <Link href="/projetos" className="block hover:text-white transition-colors">Projetos Técnicos</Link>
            </nav>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white mb-5">Cobertura</h3>
            <div className="space-y-3 text-sm" style={{ color: "#c4a8a8" }}>
              <p>Rio de Janeiro (RJ)</p>
              <p>São Paulo (SP)</p>
              <p>Minas Gerais (MG)</p>
              <p>Espírito Santo (ES)</p>
              <p style={{ color: "var(--color-service-accent, #800000)" }}>Demais sob consulta</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white mb-5">Equipe técnica</h3>
            <div className="space-y-6 text-sm" style={{ color: "#c4a8a8" }}>
              <div>
                <p className="font-semibold text-white">Durval Ribeiro de Queiroz</p>
                <p>Arquiteto e Urbanista<br />Engenharia de Segurança do Trabalho<br />Engenharia de Segurança Contra Incêndio e Pânico</p>
              </div>
              <div>
                <p className="font-semibold text-white">Theyllor Estulano do Espírito Santo</p>
                <p>Engenheiro Civil<br />Técnico em Mecânica</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 text-xs flex flex-col md:flex-row justify-between gap-3" style={{ color: "#c4a8a8" }}>
          <p>© 2026 Central de Soluções Engenharia. Todos os direitos reservados.</p>
          <p>CRECI/CREA. Responsabilidade técnica assegurada em cada serviço.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
