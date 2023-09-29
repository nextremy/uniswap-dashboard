import Link from "next/link";
import { ThemeButton } from "./theme-button";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-300 dark:border-gray-700">
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
  );
}
