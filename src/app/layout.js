// Root layout — inclui html/body e envolve a app com AuthProvider
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}