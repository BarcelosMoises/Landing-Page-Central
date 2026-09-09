"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { getWhatsAppUrl } from "@/data/servicos";

const TIPOS_SERVICO = [
  "Corpo de Bombeiros",
  "Vigilância Sanitária",
  "Meio Ambiente",
  "Prefeitura",
  "Projetos Técnicos",
  "Laudos Técnicos",
] as const;

type Campo = "nome" | "documento" | "servico" | "solicitacao";
type ErrosFormulario = Partial<Record<Campo, string>>;

function somenteDigitos(valor: string) {
  return valor.replace(/\D/g, "");
}

function validarDocumento(valor: string) {
  const digitos = somenteDigitos(valor);
  return digitos.length === 11 || digitos.length === 14;
}

export function FormularioOrcamento() {
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [servico, setServico] = useState("");
  const [solicitacao, setSolicitacao] = useState("");
  const [erros, setErros] = useState<ErrosFormulario>({});

  function validar() {
    const novosErros: ErrosFormulario = {};

    if (nome.trim().length < 2) {
      novosErros.nome = "Informe seu nome ou razão social.";
    }
    if (!validarDocumento(documento)) {
      novosErros.documento = "Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.";
    }
    if (!servico) {
      novosErros.servico = "Selecione o tipo de serviço desejado.";
    }
    if (solicitacao.trim().length < 10) {
      novosErros.solicitacao = "Descreva sua solicitação com pelo menos 10 caracteres.";
    }

    return novosErros;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const novosErros = validar();
    setErros(novosErros);

    const primeiroCampoInvalido = Object.keys(novosErros)[0] as Campo | undefined;
    if (primeiroCampoInvalido) {
      document.getElementById(`orcamento-${primeiroCampoInvalido}`)?.focus();
      return;
    }

    const mensagem = [
      "Olá! Gostaria de solicitar um orçamento para a Central de Soluções.",
      "",
      `Nome/Razão Social: ${nome.trim()}`,
      `CPF/CNPJ: ${documento.trim()}`,
      `Tipo de serviço: ${servico}`,
      `Solicitação: ${solicitacao.trim()}`,
    ].join("\n");

    window.open(getWhatsAppUrl(mensagem), "_blank", "noopener,noreferrer");
  }

  function limparErro(campo: Campo) {
    if (!erros[campo]) return;
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  }

  const campoBase =
    "mt-2 min-h-12 w-full rounded-lg border bg-white px-4 py-3 text-base text-neutral-900 outline-none transition-colors duration-200 placeholder:text-neutral-400 focus:border-transparent focus:ring-2 focus:ring-white";

  return (
    <section
      id="contato"
      aria-labelledby="orcamento-heading"
      className="py-24 sm:py-28"
      style={{
        backgroundColor:
          "var(--color-service-cta-bg, color-mix(in srgb, var(--color-service-accent, #800000) 12%, #0a0a0a))",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
            Solicite seu orçamento
          </p>
          <h2 id="orcamento-heading" className="mt-3 font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Precisa regularizar sua empresa?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg" style={{ color: "#c4a8a8" }}>
            Conte o que sua empresa precisa. Nossa equipe orienta os próximos passos para AVCB, vigilância sanitária, licenciamento ambiental, prefeitura, projetos e laudos técnicos.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] lg:items-center lg:gap-16">
          <form noValidate onSubmit={handleSubmit} className="rounded-2xl border border-white/20 bg-white/[0.08] p-6 shadow-xl shadow-black/20 sm:p-8" aria-describedby="orcamento-privacidade">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="orcamento-nome" className="text-sm font-medium text-white">
                  Nome ou razão social <span aria-hidden="true">*</span>
                </label>
                <input id="orcamento-nome" name="nome" type="text" autoComplete="organization" value={nome} onChange={(event) => { setNome(event.target.value); limparErro("nome"); }} aria-required="true" aria-invalid={Boolean(erros.nome)} aria-describedby={erros.nome ? "orcamento-erro-nome" : undefined} className={`${campoBase} ${erros.nome ? "border-red-300" : "border-transparent"}`} placeholder="Informe seu nome ou empresa" />
                {erros.nome ? <p id="orcamento-erro-nome" role="alert" className="mt-1.5 text-xs text-red-200">{erros.nome}</p> : null}
              </div>

              <div>
                <label htmlFor="orcamento-documento" className="text-sm font-medium text-white">
                  CPF ou CNPJ <span aria-hidden="true">*</span>
                </label>
                <input id="orcamento-documento" name="documento" type="text" inputMode="numeric" autoComplete="off" value={documento} onChange={(event) => { setDocumento(event.target.value); limparErro("documento"); }} aria-required="true" aria-invalid={Boolean(erros.documento)} aria-describedby={erros.documento ? "orcamento-erro-documento" : undefined} className={`${campoBase} ${erros.documento ? "border-red-300" : "border-transparent"}`} placeholder="000.000.000-00" />
                {erros.documento ? <p id="orcamento-erro-documento" role="alert" className="mt-1.5 text-xs text-red-200">{erros.documento}</p> : null}
              </div>

              <div>
                <label htmlFor="orcamento-servico" className="text-sm font-medium text-white">
                  Tipo de serviço <span aria-hidden="true">*</span>
                </label>
                <select id="orcamento-servico" name="servico" value={servico} onChange={(event) => { setServico(event.target.value); limparErro("servico"); }} aria-required="true" aria-invalid={Boolean(erros.servico)} aria-describedby={erros.servico ? "orcamento-erro-servico" : undefined} className={`${campoBase} ${erros.servico ? "border-red-300" : "border-transparent"}`}>
                  <option value="">Selecione um serviço</option>
                  {TIPOS_SERVICO.map((tipo) => <option key={tipo} value={tipo}>{tipo}</option>)}
                </select>
                {erros.servico ? <p id="orcamento-erro-servico" role="alert" className="mt-1.5 text-xs text-red-200">{erros.servico}</p> : null}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="orcamento-solicitacao" className="text-sm font-medium text-white">
                  Descreva sua solicitação <span aria-hidden="true">*</span>
                </label>
                <textarea id="orcamento-solicitacao" name="solicitacao" rows={7} maxLength={1000} value={solicitacao} onChange={(event) => { setSolicitacao(event.target.value); limparErro("solicitacao"); }} aria-required="true" aria-invalid={Boolean(erros.solicitacao)} aria-describedby={erros.solicitacao ? "orcamento-erro-solicitacao" : undefined} className={`${campoBase} resize-y ${erros.solicitacao ? "border-red-300" : "border-transparent"}`} placeholder="Ex.: preciso regularizar o AVCB de um galpão industrial." />
                {erros.solicitacao ? <p id="orcamento-erro-solicitacao" role="alert" className="mt-1.5 text-xs text-red-200">{erros.solicitacao}</p> : null}
              </div>
            </div>

            <p id="orcamento-privacidade" className="mt-6 text-xs leading-relaxed" style={{ color: "#c4a8a8" }}>
              Ao continuar, seus dados serão encaminhados ao WhatsApp da Central de Soluções para atendimento. Não armazenamos as informações neste site.
            </p>

            <button type="submit" className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-lg px-6 text-base font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0000]" style={{ backgroundColor: "var(--color-service-accent, #800000)" }}>
              Solicitar orçamento
            </button>
          </form>

          <aside className="border-t border-white/20 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0" aria-label="Canais de atendimento">
            <CheckCircle2 className="h-10 w-10" style={{ color: "var(--color-service-accent, #800000)" }} aria-hidden="true" />
            <h3 className="mt-5 font-heading text-3xl font-bold tracking-tight text-white">Atendimento técnico direto</h3>
            <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ color: "#c4a8a8" }}>
              Receba uma orientação inicial da nossa equipe e avance com segurança na regularização da sua empresa.
            </p>
            <a href={getWhatsAppUrl("Olá! Vim pelo site e gostaria de falar com a Central de Soluções.")} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0000]">
              Falar pelo WhatsApp
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
