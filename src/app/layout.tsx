"use client";

import "./globals.css";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider, useSearch } from "./context/SearchContext";
import { useDebounce } from "./utils/debounce";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <SearchProvider>
          <QueryClientProvider client={queryClient}>
            <header className="flex justify-between items-center px-10 py-4 bg-slate-500 ">
              <SearchBar />
              <nav className="flex gap-4  font-semibold">
                <Link href="/">Home</Link>
                <Link href="/watchlist">Watchlist</Link>
              </nav>
            </header>
            {children}
          </QueryClientProvider>
        </SearchProvider>
      </body>
    </html>
  );
}

function SearchBar() {
  const { setSearchQuery } = useSearch();
  const [ input, setInput ] = useState<string | undefined>();
  const debounceQuery = useDebounce(input, 700);

  useEffect(() => {
    if (debounceQuery || debounceQuery === "") {
      setSearchQuery(debounceQuery)
    }
  }, [debounceQuery, setSearchQuery]);
 

  return (
    <div>
      <input
        type="text"
        placeholder="At least 3 char..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-transparent border border-white rounded outline-none px-4 py-1 w-[500px]"
      />
    </div>
  );
}
