import { ReactNode } from "react";
import { Body } from "./body";
import { BodyCell } from "./body-cell";
import { Container } from "./container";
import { Head } from "./head";
import { HeadCell } from "./head-cell";
import { Pagination } from "./pagination";
import { Row } from "./row";

type TableProps = {
  children: ReactNode;
};

export function Table({ children }: TableProps) {
  return (
    <table className="w-full border-collapse border-spacing-0 md:table-fixed">
      {children}
    </table>
  );
}

Table.Container = Container;
Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.HeadCell = HeadCell;
Table.BodyCell = BodyCell;
Table.Pagination = Pagination;
