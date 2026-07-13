/**
 * Inyecta datos estructurados Schema.org (JSON-LD) para SEO.
 * Server Component: no envía JavaScript al cliente.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
