import { ReactNode } from "react";

export function Header(props: { children: ReactNode }) {
  return (
    <th className="px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
      {props.children}
    </th>
  );
}
