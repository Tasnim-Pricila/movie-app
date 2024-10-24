'use client'

import "./globals.css";
import Link from "next/link";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <header className="flex justify-between items-center px-10 py-4 bg-slate-500 ">
            <div>
              <input
                type="text"
                className="bg-transparent border border-white rounded outline-none px-4 py-1"
              />
            </div>
            <nav className="flex gap-4  font-semibold">
              <Link href="/">Home</Link>
              <Link href="/watchlist">Watchlist</Link>
            </nav>
          </header>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
