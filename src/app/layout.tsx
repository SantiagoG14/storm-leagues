import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <header className="flex gap-24 border-b p-6">
            <p className="font-medium text-slate-800">
              STORM <span>LEAGUES</span>
            </p>
            <nav>
              <Link href="create">Create league</Link>
            </nav>
          </header>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
