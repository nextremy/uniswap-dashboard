"use client";

import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import { TransactionRows } from "./transactions-rows";
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
