import { ReactNode } from "react";

export function Row(props: { header?: boolean; children: ReactNode }) {
  if (props.header) {
    return (
      <tr className="bg-gray-200 dark:bg-gray-800">
        {props.children}
      </tr>
    );
  }

  return <tr className="text-sm">{props.children}</tr>;
}
