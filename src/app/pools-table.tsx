"use client";

import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import { Table } from "@/components/table";
import { graphql } from "@/gql";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  RectangleGroupIcon,
} from "@heroicons/react/20/solid";
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

export function PoolsTable() {
  const [page, setPage] = useState(1);
  const [{ data, fetching }, reexecuteQuery] = useQuery({
    query: poolsQuery,
    variables: {
      skip: (page - 1) * 10,
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <RectangleGroupIcon className="h-5 w-5" />
          Pools
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
      <div className="h-4" />
      <Table.Wrapper>
        <Table>
          <Table.Head>
            <Table.Row head>
              <Table.Cell head>#</Table.Cell>
              <Table.Cell head>Pool</Table.Cell>
              <Table.Cell head>TVL (USD)</Table.Cell>
              <Table.Cell head>24h volume (USD)</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data === undefined || fetching
              ? Array(10)
                  .fill(null)
                  .map((_, index) => (
                    <Table.Row key={index}>
                      <Table.CellSkeleton />
                      <Table.CellSkeleton />
                      <Table.CellSkeleton />
                      <Table.CellSkeleton />
                    </Table.Row>
                  ))
              : data.pools.map((pool, poolIndex) => (
                  <Table.Row key={poolIndex}>
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
          <IconButton
            disabled={page === 1}
            onClick={() => setPage((page) => page - 1)}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </IconButton>
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
          <IconButton onClick={() => setPage((page) => page + 1)}>
            <ArrowRightIcon className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </IconButton>
        </nav>
      </Table.Wrapper>
    </>
  );
}
