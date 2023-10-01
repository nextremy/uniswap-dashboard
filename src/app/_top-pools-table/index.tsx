"use client";

import { Button } from "@/components/button";
import { Table } from "@/components/table";
import { graphql } from "@/gql";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useQuery } from "urql";

const poolsQuery = graphql(`
  query Pools($skip: Int) {
    pools(
      first: 10
      skip: $skip
      orderBy: totalValueLockedUSD
      orderDirection: desc
      where: { volumeUSD_gt: 0 }
    ) {
      id
      totalValueLockedUSD
      volumeUSD
      token0 {
        id
        name
        symbol
      }
      token1 {
        id
        name
        symbol
      }
    }
  }
`);

export function TopPoolsTable() {
  const [page, setPage] = useState(1);
  const [{ data, fetching }, reexecuteQuery] = useQuery({
    query: poolsQuery,
    variables: {
      skip: (page - 1) * 10,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">Top Pools</h2>
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
        columns={["#", "Pool", "TVL (USD)", "24h volume (USD)"]}
        page={page}
        rows={
          data && !fetching
            ? data.pools.map((pool, poolIndex) => [
                (page - 1) * 10 + (poolIndex + 1),
                `${pool.token0.symbol}/${pool.token1.symbol}`,
                `$${Intl.NumberFormat("en", { notation: "compact" }).format(
                  pool.totalValueLockedUSD,
                )}`,
                `$${Intl.NumberFormat("en", { notation: "compact" }).format(
                  pool.volumeUSD,
                )}`,
              ])
            : null
        }
        setPage={setPage}
      />
    </div>
  );
}
