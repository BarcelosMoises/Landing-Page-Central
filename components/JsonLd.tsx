// Componente utilitário para injetar JSON-LD no <body> via dangerouslySetInnerHTML.
// Não usa "use client" — é Server Component puro, o script é estático.

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
