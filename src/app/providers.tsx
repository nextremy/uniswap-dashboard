"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import {
  Client as URQLClient,
  Provider as URQLProvider,
  cacheExchange,
  fetchExchange,
} from "urql";

const urqlClient = new URQLClient({
  url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  exchanges: [cacheExchange, fetchExchange],
});

export function Providers(props: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <URQLProvider value={urqlClient}>{props.children}</URQLProvider>
    </ThemeProvider>
  );
}
