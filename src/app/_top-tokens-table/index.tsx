"use client";

import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import { TokensDocument, TokensQuery } from "@/gql/graphql";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import { ChangeEvent, useState } from "react";
import { useQuery } from "urql";

export function TopTokensTable() {
  const [page, setPage] = useState(1);
  const [{ data, fetching }, reexecuteQuery] = useQuery({
    query: TokensDocument,
    variables: {
      skip: (page - 1) * 10,
    },
  });

  function handlePageInputChange(event: ChangeEvent<HTMLInputElement>) {
    const input = Number(event.target.value);
    if (isNaN(input) || input < 1) {
      setPage(1);
      return;
    }
    setPage(input);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
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
      <div className="overflow-x-auto rounded-lg border-2 border-gray-200 dark:border-gray-800">
        <table className="w-full border-collapse border-spacing-0 md:table-fixed">
          <thead>
            <tr className="h-12 text-left font-semibold text-gray-600 dark:text-gray-400">
              <th className="w-16 px-4">#</th>
              <th>Token</th>
              <th className="w-48 px-4">Price</th>
              <th className="w-48 px-4">24h change</th>
              <th className="w-48 px-4">TVL</th>
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
            min={1}
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
  data: TokensQuery;
  page: number;
};

function DataRows({ data, page }: DataRowsProps) {
  return data.tokens.map((token, tokenIndex) => (
    <tr className="h-16" key={token.id}>
      <td className="px-4">{(page - 1) * 10 + (tokenIndex + 1)}</td>
      <td className="px-4">
        {token.name} ({token.symbol})
      </td>
      <td className="px-4">
        $
        {Intl.NumberFormat("en", { notation: "compact" }).format(
          token.tokenDayData[0].priceUSD,
        )}
      </td>
      <td className="px-4">
        {(() => {
          const currentPrice = Number(token.tokenDayData[0].priceUSD);
          const previousPrice = Number(token.tokenDayData[1].priceUSD);
          const changePercentage = (
            ((currentPrice - previousPrice) / previousPrice) *
            100
          ).toFixed(2);
          if (changePercentage.endsWith("0.00")) {
            return <span>0.00%</span>;
          } else if (changePercentage.startsWith("-")) {
            return (
              <span className="text-red-700 dark:text-red-300">
                {changePercentage}%
              </span>
            );
          } else {
            return (
              <span className="text-green-700 dark:text-green-300">
                {changePercentage}%
              </span>
            );
          }
        })()}
      </td>
      <td className="px-4">
        $
        {Intl.NumberFormat("en", { notation: "compact" }).format(
          token.totalValueLockedUSD,
        )}
      </td>
    </tr>
  ));
}

function LoadingRows() {
  return Array(10)
    .fill(null)
    .map((_, index0) => (
      <tr className="h-16" key={index0}>
        {Array(5)
          .fill(null)
          .map((_, index1) => (
            <td className="px-4" key={index1}>
              <div className="h-6 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
            </td>
          ))}
      </tr>
    ));
}
