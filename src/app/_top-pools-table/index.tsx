"use client";

import { Button } from "@/components/button";
import { Table } from "@/components/table";
import { graphql } from "@/gql";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useQuery } from "urql";

const query = graphql(`
  query Pools($skip: Int) {
    pools(
      first: 10
      skip: $skip
      orderBy: totalValueLockedUSD
      orderDirection: desc
      where: { volumeUSD_gt: 0 }
    ) {
      id
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
      totalValueLockedUSD
      poolDayData(first: 1, orderBy: date, orderDirection: desc) {
        volumeUSD
      }
    }
  }
`);

export function TopPoolsTable() {
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
      <Table.Container>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell className="w-16">#</Table.HeadCell>
              <Table.HeadCell>Pool</Table.HeadCell>
              <Table.HeadCell className="w-48">TVL (USD)</Table.HeadCell>
              <Table.HeadCell className="w-48">24h volume (USD)</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data && !fetching
              ? data.pools.map((pool, poolIndex) => (
                  <Table.Row key={pool.id}>
                    <Table.BodyCell>
                      {(page - 1) * 10 + (poolIndex + 1)}
                    </Table.BodyCell>
                    <Table.BodyCell>
                      {pool.token0.symbol}/{pool.token1.symbol}
                    </Table.BodyCell>
                    <Table.BodyCell>
                      $
                      {Intl.NumberFormat("en", { notation: "compact" }).format(
                        pool.totalValueLockedUSD,
                      )}
                    </Table.BodyCell>
                    <Table.BodyCell>
                      $
                      {Intl.NumberFormat("en", { notation: "compact" }).format(
                        pool.poolDayData[0].volumeUSD,
                      )}
                    </Table.BodyCell>
                  </Table.Row>
                ))
              : Array(10)
                  .fill(null)
                  .map((_, index0) => (
                    <Table.Row key={index0}>
                      {Array(4)
                        .fill(null)
                        .map((_, index1) => (
                          <Table.BodyCell key={index1} loading />
                        ))}
                    </Table.Row>
                  ))}
          </Table.Body>
        </Table>
        <Table.Pagination page={page} setPage={setPage} />
      </Table.Container>
    </div>
  );
}
