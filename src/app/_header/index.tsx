import Link from "next/link";
import { ThemeButton } from "./theme-button";

export function Header() {
  return (
    <div className="border-b-2 border-gray-300 dark:border-gray-700">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link
          className="grid h-16 place-items-center px-4 text-xl font-medium"
          href="/"
        >
          Uniswap Dashboard
        </Link>
        <div className="px-2">
          <ThemeButton />
        </div>
      </header>
    </div>
  );
}
