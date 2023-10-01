import { ComponentPropsWithoutRef, ReactNode } from "react";

type BodyCellProps = {
  loading?: boolean;
  children?: ReactNode;
} & ComponentPropsWithoutRef<"td">;

export function BodyCell({
  loading,
  className,
  children,
  ...props
}: BodyCellProps) {
  return (
    <td className={`h-16 px-4 ${className}`} {...props}>
      {loading ? (
        <div className="h-6 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700" />
      ) : (
        children
      )}
    </td>
  );
}
