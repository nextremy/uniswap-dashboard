"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import {
  Client as UrqlClient,
  Provider as UrqlProvider,
  cacheExchange,
  fetchExchange,
} from "urql";

const urqlClient = new UrqlClient({
  url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  exchanges: [cacheExchange, fetchExchange],
});

export function Providers(props: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <UrqlProvider value={urqlClient}>{props.children}</UrqlProvider>
    </ThemeProvider>
  );
}
