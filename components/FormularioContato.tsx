"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getWhatsAppUrl, contato } from "@/data/servicos";

// ─── Schema Zod ────────────────────────────────────────────────────────────────

const TELEFONE_BR_REGEX = /^\(?\d{2}\)?[\s\-]?9?\d{4}[\s\-]?\d{4}$/;

const contatoSchema = z.object({
  nome: z
    .string({ required_error: "Nome é obrigatório" })
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(80, "Nome muito longo"),
  empresa: z
    .string({ required_error: "Empresa é obrigatória" })
    .min(2, "Nome da empresa deve ter pelo menos 2 caracteres")
    .max(100, "Nome da empresa muito longo"),
  telefone: z
    .string({ required_error: "Telefone é obrigatório" })
    .regex(TELEFONE_BR_REGEX, "Informe um telefone válido (ex: (22) 98112-1315)"),
  estado: z.enum(["rj", "sp", "mg", "es", "outro"], {
    required_error: "Selecione o estado",
    invalid_type_error: "Selecione uma opção válida",
  }),
  servico: z.enum(
    [
      "avcb",
      "spda",
      "vigilancia-sanitaria",
      "licenciamento-ambiental",
      "laudos-tecnicos",
      "projetos",
      "aterramento",
      "combate-incendio",
      "outro",
    ],
    {
      required_error: "Selecione o serviço de interesse",
      invalid_type_error: "Selecione uma opção válida",
    }
  ),
  mensagem: z
    .string()
    .max(500, "Mensagem muito longa")
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || val.length === 0 || val.length >= 10,
      "Se preencher a mensagem, escreva pelo menos 10 caracteres"
    ),
});

type ContatoFormData = z.infer<typeof contatoSchema>;

// ─── Labels e opções ───────────────────────────────────────────────────────────

const ESTADOS_OPTIONS = [
  { value: "rj", label: "Rio de Janeiro" },
  { value: "sp", label: "São Paulo" },
  { value: "mg", label: "Minas Gerais" },
  { value: "es", label: "Espírito Santo" },
  { value: "outro", label: "Outro estado" },
] as const;

const SERVICOS_OPTIONS = [
  { value: "avcb", label: "AVCB / CLCB — Corpo de Bombeiros" },
  { value: "spda", label: "SPDA — Sistema de Para-raios" },
  { value: "vigilancia-sanitaria", label: "Alvará Sanitário / Vigilância Sanitária" },
  { value: "licenciamento-ambiental", label: "Licenciamento Ambiental" },
  { value: "laudos-tecnicos", label: "Laudos Técnicos" },
  { value: "projetos", label: "Projetos Técnicos de Engenharia" },
  { value: "aterramento", label: "Aterramento Elétrico" },
  { value: "combate-incendio", label: "Sistemas de Combate a Incêndio" },
  { value: "outro", label: "Outro / Não sei ainda" },
] as const;

const ESTADO_LABEL: Record<string, string> = {
  rj: "Rio de Janeiro",
  sp: "São Paulo",
  mg: "Minas Gerais",
  es: "Espírito Santo",
  outro: "outro estado",
};

const SERVICO_LABEL: Record<string, string> = {
  avcb: "AVCB / CLCB",
  spda: "SPDA (Para-raios)",
  "vigilancia-sanitaria": "Alvará Sanitário",
  "licenciamento-ambiental": "Licenciamento Ambiental",
  "laudos-tecnicos": "Laudos Técnicos",
  projetos: "Projetos Técnicos",
  aterramento: "Aterramento Elétrico",
  "combate-incendio": "Combate a Incêndio",
  outro: "serviço a definir",
};

// ─── Classes reutilizáveis ───────────────────────────────────────────────────────────

const inputBase =
  "w-full border rounded-lg px-4 py-3 text-neutral-700 text-base bg-white outline-none transition-colors duration-150 " +
  "focus:ring-2 focus:ring-[#800000] focus:border-transparent " +
  "placeholder:text-neutral-400";

const inputNormal = inputBase + " border-neutral-200";
const inputError = inputBase + " border-red-400 bg-red-50";

// ─── Componente principal ─────────────────────────────────────────────────────────

export function FormularioContato() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContatoFormData>({
    resolver: zodResolver(contatoSchema),
    mode: "onBlur",
  });

  function onSubmit(data: ContatoFormData) {
    const estadoLabel = ESTADO_LABEL[data.estado] ?? data.estado;
    const servicoLabel = SERVICO_LABEL[data.servico] ?? data.servico;

    const linhas = [
      `Olá! Vim pelo site da Central de Soluções e gostaria de solicitar um orçamento.`,
      ``,
      `*Nome:* ${data.nome}`,
      `*Empresa:* ${data.empresa}`,
      `*Telefone:* ${data.telefone}`,
      `*Estado:* ${estadoLabel}`,
      `*Serviço de interesse:* ${servicoLabel}`,
      data.mensagem ? `*Mensagem:* ${data.mensagem}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const url = getWhatsAppUrl(linhas);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="bg-[#111827] py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Lado esquerdo — copy */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#f5a0a0] mb-3">
                Orçamento gratuito
              </p>
              {/* #fff sobre #111827 → contraste 15.3:1 ✓ WCAG AAA */}
              <h2
                id="contato-heading"
                className="font-heading text-2xl md:text-4xl font-bold text-white leading-tight mb-4"
              >
                Solicite um Orçamento Sem Compromisso
              </h2>
              {/* text-neutral-400 sobre #111827 → contraste 7.0:1 ✓ WCAG AA */}
              <p className="text-neutral-400 text-lg leading-relaxed">
                Preencha o formulário e entraremos em contato pelo WhatsApp em
                até 1 dia útil. Atendemos indústrias, galpons logísticos,
                empresas de telecom e energia solar em ES, MG, RJ e SP.
              </p>
            </div>

            {/* Informações de contato direto */}
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${contato.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Entrar em contato pelo WhatsApp da Central de Soluções — abre em nova aba"
                className="inline-flex items-center gap-3 text-white hover:text-[#f5a0a0] transition-colors duration-150 group"
              >
                <span
                  aria-hidden="true"
                  className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  {/* WhatsApp icon SVG inline — sem dependência de biblioteca de ícone */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                <span className="font-semibold text-base">{contato.telefone}</span>
              </a>

              <a
                href={`mailto:${contato.email}`}
                aria-label={`Enviar e-mail para ${contato.email}`}
                className="inline-flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-150 text-sm"
              >
                <span
                  aria-hidden="true"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0"
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

          {/* Lado direito — formulário */}
          <div>
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
              {isSubmitSuccessful ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-center text-center gap-4 py-8"
                >
                  <span
                    aria-hidden="true"
                    className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-7 h-7 text-green-600"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <h3 className="font-heading text-xl font-bold text-neutral-900">
                    Mensagem enviada!
                  </h3>
                  <p className="text-neutral-700 text-base">
                    O WhatsApp da Central de Soluções foi aberto com suas
                    informações. Retornaremos em até 1 dia útil.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  aria-label="Formulário de solicitação de orçamento"
                  className="flex flex-col gap-5"
                >
                  {/* Nome */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="nome"
                      className="text-sm font-semibold text-neutral-700"
                    >
                      Nome completo{" "}
                      <span aria-hidden="true" className="text-[#800000]">*</span>
                    </label>
                    <input
                      id="nome"
                      type="text"
                      autoComplete="name"
                      placeholder="Ex: João Silva"
                      aria-required="true"
                      aria-invalid={!!errors.nome}
                      aria-describedby={errors.nome ? "nome-erro" : undefined}
                      className={errors.nome ? inputError : inputNormal}
                      {...register("nome")}
                    />
                    {errors.nome && (
                      <p
                        id="nome-erro"
                        role="alert"
                        className="text-xs text-red-600 font-medium"
                      >
                        {errors.nome.message}
                      </p>
                    )}
                  </div>

                  {/* Empresa */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="empresa"
                      className="text-sm font-semibold text-neutral-700"
                    >
                      Empresa{" "}
                      <span aria-hidden="true" className="text-[#800000]">*</span>
                    </label>
                    <input
                      id="empresa"
                      type="text"
                      autoComplete="organization"
                      placeholder="Razão social ou nome fantasia"
                      aria-required="true"
                      aria-invalid={!!errors.empresa}
                      aria-describedby={errors.empresa ? "empresa-erro" : undefined}
                      className={errors.empresa ? inputError : inputNormal}
                      {...register("empresa")}
                    />
                    {errors.empresa && (
                      <p
                        id="empresa-erro"
                        role="alert"
                        className="text-xs text-red-600 font-medium"
                      >
                        {errors.empresa.message}
                      </p>
                    )}
                  </div>

                  {/* Telefone */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="telefone"
                      className="text-sm font-semibold text-neutral-700"
                    >
                      Telefone / WhatsApp{" "}
                      <span aria-hidden="true" className="text-[#800000]">*</span>
                    </label>
                    <input
                      id="telefone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(22) 98112-1315"
                      aria-required="true"
                      aria-invalid={!!errors.telefone}
                      aria-describedby={errors.telefone ? "telefone-erro" : undefined}
                      className={errors.telefone ? inputError : inputNormal}
                      {...register("telefone")}
                    />
                    {errors.telefone && (
                      <p
                        id="telefone-erro"
                        role="alert"
                        className="text-xs text-red-600 font-medium"
                      >
                        {errors.telefone.message}
                      </p>
                    )}
                  </div>

                  {/* Estado + Serviço lado a lado em md: */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Estado */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="estado"
                        className="text-sm font-semibold text-neutral-700"
                      >
                        Estado{" "}
                        <span aria-hidden="true" className="text-[#800000]">*</span>
                      </label>
                      <select
                        id="estado"
                        aria-required="true"
                        aria-invalid={!!errors.estado}
                        aria-describedby={errors.estado ? "estado-erro" : undefined}
                        className={errors.estado ? inputError : inputNormal}
                        defaultValue=""
                        {...register("estado")}
                      >
                        <option value="" disabled>
                          Selecione
                        </option>
                        {ESTADOS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.estado && (
                        <p
                          id="estado-erro"
                          role="alert"
                          className="text-xs text-red-600 font-medium"
                        >
                          {errors.estado.message}
                        </p>
                      )}
                    </div>

                    {/* Serviço */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="servico"
                        className="text-sm font-semibold text-neutral-700"
                      >
                        Serviço de interesse{" "}
                        <span aria-hidden="true" className="text-[#800000]">*</span>
                      </label>
                      <select
                        id="servico"
                        aria-required="true"
                        aria-invalid={!!errors.servico}
                        aria-describedby={errors.servico ? "servico-erro" : undefined}
                        className={errors.servico ? inputError : inputNormal}
                        defaultValue=""
                        {...register("servico")}
                      >
                        <option value="" disabled>
                          Selecione
                        </option>
                        {SERVICOS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.servico && (
                        <p
                          id="servico-erro"
                          role="alert"
                          className="text-xs text-red-600 font-medium"
                        >
                          {errors.servico.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mensagem opcional */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="mensagem"
                      className="text-sm font-semibold text-neutral-700"
                    >
                      Mensagem{" "}
                      <span className="text-neutral-400 font-normal">(opcional)</span>
                    </label>
                    <textarea
                      id="mensagem"
                      rows={3}
                      placeholder="Descreva brevemente sua necessidade..."
                      aria-invalid={!!errors.mensagem}
                      aria-describedby={
                        errors.mensagem ? "mensagem-erro" : "mensagem-hint"
                      }
                      className={`${errors.mensagem ? inputError : inputNormal} resize-none`}
                      {...register("mensagem")}
                    />
                    {errors.mensagem ? (
                      <p
                        id="mensagem-erro"
                        role="alert"
                        className="text-xs text-red-600 font-medium"
                      >
                        {errors.mensagem.message}
                      </p>
                    ) : (
                      <p
                        id="mensagem-hint"
                        className="text-xs text-neutral-400"
                      >
                        Máximo 500 caracteres
                      </p>
                    )}
                  </div>

                  {/* Aviso de obrigatórios */}
                  <p className="text-xs text-neutral-400">
                    <span aria-hidden="true" className="text-[#800000]">*</span>{" "}
                    Campos obrigatórios
                  </p>

                  {/* Botão submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Enviar solicitação de orçamento pelo WhatsApp"
                    className="w-full bg-[#800000] hover:bg-[#4f0101] active:bg-[#4f0101] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base px-6 py-4 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800000] focus-visible:ring-offset-2"
                  >
                    {isSubmitting
                      ? "Preparando mensagem..."
                      : "Solicitar Orçamento pelo WhatsApp"}
                  </button>

                  {/* Informação de privacidade */}
                  <p className="text-xs text-neutral-400 text-center leading-relaxed">
                    Ao enviar, você será redirecionado ao WhatsApp da Central de
                    Soluções. Seus dados não são armazenados por este site.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
