"use client";

import { Button } from "@/components/button";
import { TablePagination } from "@/components/table-pagination";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { TransactionRows } from "./transactions-rows";
import { useTransactions } from "./use-transactions";

export function TransactionsTable() {
  const [page, setPage] = useState(1);
  const { transactions, refreshTransactions } = useTransactions();
  const pageCount = transactions && Math.ceil(transactions.length / 10);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          Transactions
        </h2>
        <Button intent="secondary" onClick={refreshTransactions}>
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
        <TablePagination page={page} pageCount={pageCount} setPage={setPage} />
      </div>
    </div>
  );
}
