import { ComponentPropsWithoutRef, ReactNode } from "react";

type HeadCellProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"th">;

export function HeadCell({ className, children, ...props }: HeadCellProps) {
  return (
    <th
      className={`h-12 px-4 text-left font-semibold text-gray-600 dark:text-gray-400 ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}
