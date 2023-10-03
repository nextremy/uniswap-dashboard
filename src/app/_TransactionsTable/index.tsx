"use client";

import { Button } from "@/components/Button";
import { TablePagination } from "@/components/TablePagination";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { TransactionRows } from "./TransactionRows";
import { useTransactions } from "./useTransactions";

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
      <div className="rounded-lg border-2 border-gray-200 dark:border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse border-spacing-0 text-sm lg:text-base">
            <thead>
              <tr className="h-12 text-left font-semibold text-gray-600 dark:text-gray-400">
                <th className="w-24 px-4 lg:w-24">Type</th>
                <th className="w-48 px-4 lg:w-auto">Token amounts</th>
                <th className="w-16 px-4 lg:w-48">Total value</th>
                <th className="w-32 px-4 lg:w-48">Account</th>
                <th className="w-32 px-4 lg:w-48">Time</th>
              </tr>
            </thead>
            <tbody>
              <TransactionRows page={page} />
            </tbody>
          </table>
        </div>
        <TablePagination page={page} pageCount={pageCount} setPage={setPage} />
      </div>
    </div>
  );
}
