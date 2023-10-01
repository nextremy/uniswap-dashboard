"use client";

import { Button } from "@/components/button";
import { Table } from "@/components/table";
import { graphql } from "@/gql";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useQuery } from "urql";

const query = graphql(`
  query Tokens($skip: Int) {
    tokens(
      first: 10
      skip: $skip
      orderBy: totalValueLockedUSD
      orderDirection: desc
    ) {
      id
      name
      symbol
      totalValueLockedUSD
      tokenDayData(first: 2, orderBy: date, orderDirection: desc) {
        date
        priceUSD
      }
    }
  }
`);

export function TopTokensTable() {
  const [page, setPage] = useState(1);
  const [{ data, fetching }, reexecuteQuery] = useQuery({
    query,
    variables: {
      skip: (page - 1) * 10,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <CurrencyDollarIcon className="h-6 w-6" />
          Top Tokens
        </h2>
        <Button
          className="flex items-center gap-2"
          intent="secondary"
          onClick={() => reexecuteQuery({ requestPolicy: "network-only" })}
        >
          <ArrowPathIcon className="h-5 w-5" />
          Refresh
        </Button>
      </div>
      <Table
        columns={["#", "Token", "Price (USD)", "24h change", "TVL (USD)"]}
        page={page}
        rows={
          data && !fetching
            ? data.tokens.map((token, tokenIndex) => [
                (page - 1) * 10 + (tokenIndex + 1),
                `${token.name} (${token.symbol})`,
                `$${Intl.NumberFormat("en", { notation: "compact" }).format(
                  token.tokenDayData[0].priceUSD,
                )}`,
                (() => {
                  const price0 = Number(token.tokenDayData[0].priceUSD);
                  const price1 = Number(token.tokenDayData[1].priceUSD);
                  const change = (price0 / price1 - 1).toFixed(2);
                  if (change.startsWith("-")) {
                    return (
                      <span className="text-red-700 dark:text-red-300">
                        {change}%
                      </span>
                    );
                  } else {
                    return (
                      <span className="text-green-700 dark:text-green-300">
                        {change}%
                      </span>
                    );
                  }
                })(),
                `$${Intl.NumberFormat("en", { notation: "compact" }).format(
                  token.totalValueLockedUSD,
                )}`,
              ])
            : null
        }
        setPage={setPage}
      />
    </div>
  );
}
