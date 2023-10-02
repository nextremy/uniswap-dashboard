"use client";

import { cx } from "class-variance-authority";
import { differenceInMinutes } from "date-fns";
import Link from "next/link";
import { LoadingRows } from "./loading-rows";
import { useTransactions } from "./use-transactions";

type TransactionRowsProps = {
  page: number;
};

export function TransactionRows({ page }: TransactionRowsProps) {
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
