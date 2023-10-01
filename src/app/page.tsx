import { PoolsTable } from "./_pools-table";
import { TokensTable } from "./_tokens-table";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-8 p-4">
      <PoolsTable />
      <TokensTable />
    </main>
  );
}
