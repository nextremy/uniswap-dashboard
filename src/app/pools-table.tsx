"use client";

import { graphql } from "@/gql";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useQuery } from "urql";

const poolsQuery = graphql(`
  query Pools($skip: Int) {
    pools(
      first: 10
      skip: $skip
      orderBy: totalValueLockedUSD
      orderDirection: desc
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

export function PoolsTable() {
  const [page, setPage] = useState(1);
  const [{ data }] = useQuery({
    query: poolsQuery,
    variables: {
      skip: (page - 1) * 10,
    },
  });

  if (!data) {
    return null;
  }
  return (
    <>
      <h2 className="text-lg font-bold">Pools</h2>
      <div className="mt-2 overflow-x-auto rounded-lg border-2 border-gray-200 dark:border-gray-800">
        <table className="w-full border-collapse border-spacing-0">
          <thead>
            <tr className="h-10 bg-gray-200 dark:bg-gray-800">
              <th className="px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                #
              </th>
              <th className="px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Pool
              </th>
              <th className="px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                TVL (USD)
              </th>
              <th className="px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                24h volume (USD)
              </th>
            </tr>
          </thead>
          <tbody>
            {data.pools.map((pool, poolIndex) => (
              <tr key={pool.id}>
                <td className="px-4 py-2 text-sm">
                  {(page - 1) * 10 + poolIndex + 1}
                </td>
                <td className="px-4 py-2 text-sm">
                  {`${pool.token0.symbol}/${pool.token1.symbol}`}
                </td>
                <td className="px-4 py-2 text-sm">
                  $
                  {Intl.NumberFormat("en", { notation: "compact" }).format(
                    pool.totalValueLockedUSD,
                  )}
                </td>
                <td className="px-4 py-2 text-sm">
                  $
                  {Intl.NumberFormat("en", { notation: "compact" }).format(
                    pool.volumeUSD,
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav className="flex justify-center gap-2 p-2">
          <button
            className="grid h-10 w-10 place-items-center rounded-md bg-gray-300 duration-150 enabled:hover:bg-gray-400 disabled:opacity-50 dark:bg-gray-700 dark:enabled:hover:bg-gray-600"
            disabled={page === 1}
            onClick={() => setPage((page) => page - 1)}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </button>
          <input
            className="w-10 rounded-md text-center font-medium text-blue-700 dark:bg-gray-800 dark:text-blue-300"
            min={1}
            onChange={(event) => {
              const input = Number(event.target.value);
              if (isNaN(input) || input < 1) {
                setPage(1);
                return;
              }
              setPage(input);
            }}
            type="number"
            value={page}
          />
          <button
            className="grid h-10 w-10 place-items-center rounded-md bg-gray-300 duration-150 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={() => setPage((page) => page + 1)}
          >
            <ArrowRightIcon className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </button>
        </nav>
      </div>
    </>
  );
}
