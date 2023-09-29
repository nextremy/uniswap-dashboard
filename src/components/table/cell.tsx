import { ReactNode } from "react";

export function Cell(props: { header?: boolean; children: ReactNode }) {
  if (props.header) {
    return (
      <th className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
        {props.children}
      </th>
    );
  }

  return <td className="p-4">{props.children}</td>;
}
