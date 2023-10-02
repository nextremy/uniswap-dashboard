"use client";

import { Button } from "@/components/button";
import { TablePagination } from "@/components/table-pagination";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { TokenRows } from "./token-rows";
import { useTokens } from "./use-tokens";

export function TopTokensTable() {
  const [page, setPage] = useState(1);
  const { tokens, refreshTokens } = useTokens();
  const pageCount = tokens && Math.ceil(tokens.length / 10);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          Top Tokens
        </h2>
        <Button intent="secondary" onClick={refreshTokens}>
          <ArrowPathIcon className="h-5 w-5" />
          Refresh
        </Button>
      </div>
      <div className="overflow-x-auto rounded-lg border-2 border-gray-200 dark:border-gray-800">
        <table className="w-full border-collapse border-spacing-0 md:table-fixed">
          <thead>
            <tr className="h-12 text-left font-semibold text-gray-600 dark:text-gray-400">
              <th className="w-16 px-4">#</th>
              <th className="px-4">Token</th>
              <th className="w-48 px-4">Price</th>
              <th className="w-48 px-4">24h change</th>
              <th className="w-48 px-4">TVL</th>
            </tr>
          </thead>
          <tbody>
            <TokenRows page={page} />
          </tbody>
        </table>
        <TablePagination page={page} pageCount={pageCount} setPage={setPage} />
      </div>
    </div>
  );
}
