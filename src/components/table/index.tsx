import { ReactNode } from "react";
import { Body } from "./body";
import { Cell } from "./cell";
import { Head } from "./head";
import { Header } from "./header";
import { Row } from "./row";
import { Wrapper } from "./wrapper";

export function Table(props: { children: ReactNode }) {
  return (
    <table className="w-full border-collapse border-spacing-0">
      {props.children}
    </table>
  );
}

Table.Wrapper = Wrapper;
Table.Head = Head;
Table.Row = Row;
Table.Header = Header;
Table.Body = Body;
Table.Cell = Cell;
