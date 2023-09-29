import { ReactNode } from "react";

export function Row(props: { head?: boolean; children: ReactNode }) {
  if (props.head) {
    return <tr className="bg-gray-200 dark:bg-gray-800">{props.children}</tr>;
  }

  return <tr className="text-sm">{props.children}</tr>;
}
