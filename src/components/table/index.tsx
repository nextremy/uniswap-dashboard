import { ReactNode } from "react";
import { Body } from "./body";
import { Cell } from "./cell";
import { CellSkeleton } from "./cell-skeleton";
import { Head } from "./head";
import { Row } from "./row";
import { Wrapper } from "./wrapper";

export function Table(props: { children: ReactNode }) {
  return (
    <table className="w-full border-collapse border-spacing-0 md:table-fixed">
      {props.children}
    </table>
  );
}

Table.Wrapper = Wrapper;
Table.Head = Head;
Table.Row = Row;
Table.Body = Body;
Table.Cell = Cell;
Table.CellSkeleton = CellSkeleton;
