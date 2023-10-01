import { ReactNode } from "react";

type RowProps = {
  children: ReactNode;
};

export function Row({ children }: RowProps) {
  return <tr>{children}</tr>;
}
