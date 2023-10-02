"use client";

import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import { PoolsDocument, PoolsQuery } from "@/gql/graphql";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import { ChangeEvent, useState } from "react";
import { useQuery } from "urql";

export function TopPoolsTable() {
  const [page, setPage] = useState(1);
  const [{ data, fetching }, reexecuteQuery] = useQuery({
    query: PoolsDocument,
    variables: {
      skip: (page - 1) * 10,
    },
  });

  function handlePageInputChange(event: ChangeEvent<HTMLInputElement>) {
    const input = Number(event.target.value);
    if (input < 1 || isNaN(input)) {
      setPage(1);
    } else {
      setPage(input);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">Top Pools</h2>
        <Button
          intent="secondary"
          onClick={() => reexecuteQuery({ requestPolicy: "network-only" })}
        >
          <ArrowPathIcon className="h-5 w-5" />
          Refresh
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border-2 border-gray-200 dark:border-gray-800">
        <table className="w-full border-collapse border-spacing-0 md:table-fixed">
          <thead>
            <tr className="h-12 text-left font-semibold text-gray-600 dark:text-gray-400">
              <th className="w-16 px-4">#</th>
              <th className="px-4">Pool</th>
              <th className="w-48 px-4">TVL</th>
              <th className="w-48 px-4">24h volume</th>
            </tr>
          </thead>
          <tbody>
            {data && !fetching ? (
              <DataRows data={data} page={page} />
            ) : (
              <LoadingRows />
            )}
          </tbody>
        </table>
        <nav className="flex justify-center gap-2 p-2">
          <IconButton
            disabled={page === 1}
            onClick={() => setPage((page) => page - 1)}
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </IconButton>
          <input
            className="w-12 rounded-md bg-gray-200 text-center font-medium text-blue-700 dark:bg-gray-800 dark:text-blue-300"
            onChange={handlePageInputChange}
            type="number"
            value={page}
          />
          <IconButton onClick={() => setPage((page) => page + 1)}>
            <ArrowRightIcon className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </IconButton>
        </nav>
      </div>
    </div>
  );
}

type DataRowsProps = {
  data: PoolsQuery;
  page: number;
};

function DataRows({ data, page }: DataRowsProps) {
  return data.pools.map((pool, poolIndex) => (
    <tr className="h-16" key={pool.id}>
      <td className="px-4">{(page - 1) * 10 + (poolIndex + 1)}</td>
      <td className="px-4">
        {pool.token0.symbol}/{pool.token1.symbol}
      </td>
      <td className="px-4">
        $
        {Intl.NumberFormat("en", { notation: "compact" }).format(
          pool.totalValueLockedUSD,
        )}
      </td>
      <td className="px-4">
        $
        {Intl.NumberFormat("en", { notation: "compact" }).format(
          pool.poolDayData[0].volumeUSD,
        )}
      </td>
    </tr>
  ));
}

function LoadingRows() {
  return Array(10)
    .fill(null)
    .map((_, index0) => (
      <tr key={index0}>
        {Array(4)
          .fill(null)
          .map((_, index1) => (
            <td className="h-16 px-4" key={index1}>
              <div className="h-6 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
            </td>
          ))}
      </tr>
    ));
}
