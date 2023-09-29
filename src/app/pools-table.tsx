"use client";

import { Table } from "@/components/table";
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
      <Table.Wrapper>
        <Table>
          <Table.Head>
            <Table.Row header>
              <Table.Cell header>#</Table.Cell>
              <Table.Cell header>Pool</Table.Cell>
              <Table.Cell header>TVL (USD)</Table.Cell>
              <Table.Cell header>24h volume (USD)</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data.pools.map((pool, poolIndex) => (
              <Table.Row key={pool.id}>
                <Table.Cell>{(page - 1) * 10 + poolIndex + 1}</Table.Cell>
                <Table.Cell>
                  {`${pool.token0.symbol}/${pool.token1.symbol}`}
                </Table.Cell>
                <Table.Cell>
                  $
                  {Intl.NumberFormat("en", { notation: "compact" }).format(
                    pool.totalValueLockedUSD,
                  )}
                </Table.Cell>
                <Table.Cell>
                  $
                  {Intl.NumberFormat("en", { notation: "compact" }).format(
                    pool.volumeUSD,
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <nav className="flex justify-center gap-2 p-2">
          <button
            className="grid h-10 w-10 place-items-center rounded-md bg-gray-300 duration-150 enabled:hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:enabled:hover:bg-gray-600"
            disabled={page === 1}
            onClick={() => setPage((page) => page - 1)}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </button>
          <input
            className="w-10 rounded-md bg-gray-200 text-center font-medium text-blue-700 dark:bg-gray-800 dark:text-blue-300"
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
            className="grid h-10 w-10 place-items-center rounded-md bg-gray-300 duration-150 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={() => setPage((page) => page + 1)}
          >
            <ArrowRightIcon className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </button>
        </nav>
      </Table.Wrapper>
    </>
  );
}
