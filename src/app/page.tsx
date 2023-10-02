import { TopPoolsTable } from "./_top-pools-table";
import { TopTokensTable } from "./_top-tokens-table";
import { TransactionsTable } from "./_transactions-table";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 p-4">
      <TopPoolsTable />
      <TopTokensTable />
      <TransactionsTable />
    </main>
  );
}
