import { TopPoolsTable } from "./_TopPoolsTable";
import { TopTokensTable } from "./_TopTokensTable";
import { TransactionsTable } from "./_TransactionsTable";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 p-4">
      <TopPoolsTable />
      <TopTokensTable />
      <TransactionsTable />
    </main>
  );
}
