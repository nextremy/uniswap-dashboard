import { ReactNode } from "react";

export function Wrapper(props: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border-2 border-gray-200 dark:border-gray-800">
      {props.children}
    </div>
  );
}
