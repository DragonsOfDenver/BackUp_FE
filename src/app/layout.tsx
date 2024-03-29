import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { config } from '@/config'
import { ContextProvider } from '@/context'
import { Header } from '@/components'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vice Roll Casino",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider initialState={initialState}>
          <Header />
          {children}</ContextProvider>
      </body>
    </html>
  );
}
