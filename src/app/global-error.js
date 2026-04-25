"use client";

/**
 * Exibido quando o erro ocorre no `layout` raiz (não herda `Providers` nem o tema MUI).
 */
export default function GlobalError({ error, reset }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="pt-BR">
      <head>
        <title>Erro | APAE Agenda</title>
      </head>
      <body
        style={{
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          margin: 0,
          padding: 24,
          maxWidth: 560,
        }}
      >
        <h1 style={{ fontSize: "1.25rem" }}>Erro na aplicação</h1>
        <p style={{ color: "#555" }}>Não foi possível carregar a interface. Tente novamente.</p>
        {isDev && error?.message && (
          <pre
            style={{
              fontSize: 12,
              background: "#f5f5f5",
              padding: 12,
              overflow: "auto",
            }}
          >
            {String(error.message)}
          </pre>
        )}
        <p>
          <button type="button" onClick={() => reset()}>
            Tentar novamente
          </button>
        </p>
      </body>
    </html>
  );
}
