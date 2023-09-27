import Link from "next/link";

export function Header() {
  return (
    <header className="flex h-16 items-center">
      <Link
        className="grid h-16 place-items-center px-4 text-lg font-medium"
        href="/"
      >
        Uniswap Dashboard
      </Link>
    </header>
  );
}
