"use client";

import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import { cx } from "class-variance-authority";
import { differenceInMinutes } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { useTransactions } from "./use-transactions";

export function TransactionsTable() {
  const [page, setPage] = useState(1);
  const { refreshTransactions } = useTransactions();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          Transactions
        </h2>
        <Button
          className="flex items-center gap-2"
          intent="secondary"
          onClick={refreshTransactions}
        >
          <ArrowPathIcon className="h-5 w-5" />
          Refresh
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border-2 border-gray-200 dark:border-gray-800">
        <table className="w-full border-collapse border-spacing-0 md:table-fixed">
          <thead>
            <tr className="h-12 text-left font-semibold text-gray-600 dark:text-gray-400">
              <th className="w-24 px-4">Type</th>
              <th className="px-4">Token amounts</th>
              <th className="w-48 px-4">Total value</th>
              <th className="w-48 px-4">Account</th>
              <th className="w-48 px-4">Time</th>
            </tr>
          </thead>
          <tbody>
            <TransactionRows page={page} />
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
          <div className="grid w-12 place-items-center rounded-md bg-gray-200 font-medium text-blue-700 dark:bg-gray-800 dark:text-blue-300">
            {page}
          </div>
          <IconButton onClick={() => setPage((page) => page + 1)}>
            <ArrowRightIcon className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </IconButton>
        </nav>
      </div>
    </div>
  );
}

type TransactionRowsProps = {
  page: number;
};

function TransactionRows({ page }: TransactionRowsProps) {
  const { transactions, fetchingTransactions } = useTransactions();

  if (!transactions || fetchingTransactions) {
    return <LoadingRows />;
  }
  const transactionsPage = transactions.slice(
    (page - 1) * 10,
    (page - 1) * 10 + 10,
  );
  return transactionsPage.map((transaction) => (
    <tr className="h-16" key={transaction!.id}>
      <td className="px-4">
        <span
          className={cx(
            "grid place-items-center rounded-md bg-blue-200 px-2 py-0.5 font-medium text-gray-100 dark:text-gray-900",
            transaction.__typename === "Swap" && "bg-blue-700 dark:bg-blue-300",
            transaction.__typename === "Mint" &&
              "bg-green-700 dark:bg-green-300",
            transaction.__typename === "Burn" && "bg-red-700 dark:bg-red-300",
          )}
        >
          {transaction.__typename}
        </span>
      </td>
      <td className="px-4">
        {(() => {
          const format = (n: string) =>
            Intl.NumberFormat("en", { notation: "compact" }).format(
              Math.abs(Number(n)),
            );
          if (transaction.__typename === "Swap") {
            return transaction.amount0 < 0
              ? `${format(transaction.amount1)} ${
                  transaction.token1.symbol
                } -> ${format(transaction.amount0)} ${
                  transaction.token0.symbol
                }`
              : `${format(transaction.amount0)} ${
                  transaction.token0.symbol
                } -> ${format(transaction.amount1)} ${
                  transaction.token1.symbol
                }`;
          }
          return `${format(transaction.amount0)} ${
            transaction.token0.symbol
          } + ${format(transaction.amount1)} ${transaction.token1.symbol}`;
        })()}
      </td>
      <td className="px-4">
        $
        {Intl.NumberFormat("en", { notation: "compact" }).format(
          transaction.amountUSD,
        )}
      </td>
      <td className="px-4">
        <Link
          className="text-blue-700 hover:underline dark:text-blue-300"
          href={`https://etherscan.io/address/${transaction.origin}`}
        >
          {`0x${transaction.origin
            .slice(2, 6)
            .toUpperCase()}...${transaction.origin.slice(-4).toUpperCase()}`}
        </Link>
      </td>
      <td className="px-4">
        {(() => {
          const currentTimestamp = Date.now();
          const transactionTimestamp = Number(transaction.timestamp) * 1000;
          const time = differenceInMinutes(
            currentTimestamp,
            transactionTimestamp,
          );
          if (time === 0) {
            return "< 1 minute ago";
          } else if (time === 1) {
            return `1 minute ago`;
          } else {
            return `${time} minutes ago`;
          }
        })()}
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
