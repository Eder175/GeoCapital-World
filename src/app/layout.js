import '../styles/globals.css';

export const metadata = {
  title: 'GeoCapital',
  description: 'Sistema de finanças pessoais',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
