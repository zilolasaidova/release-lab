import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Учебный портал — онлайн-курсы',
  description: 'Каталог коротких практических онлайн-курсов.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
