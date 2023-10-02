"use client";

import { Button } from "@/components/Button";
import { TablePagination } from "@/components/TablePagination";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { PoolRows } from "./PoolRows";
import { usePools } from "./usePools";

export function TopPoolsTable() {
  const [page, setPage] = useState(1);
  const { pools, refreshPools } = usePools();
  const pageCount = pools && Math.ceil(pools.length / 10);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">Top Pools</h2>
        <Button intent="secondary" onClick={refreshPools}>
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
            <PoolRows page={page} />
          </tbody>
        </table>
        <TablePagination page={page} pageCount={pageCount} setPage={setPage} />
      </div>
    </div>
  );
}
