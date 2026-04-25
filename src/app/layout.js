import Providers from "./providers";

export const metadata = {
  title: "APAE Agenda",
  description: "Sistema de agenda da APAE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


