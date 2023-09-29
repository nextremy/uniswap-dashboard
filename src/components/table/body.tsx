import { ReactNode } from "react";

export function Body(props: { children: ReactNode }) {
  return <tbody>{props.children}</tbody>;
}
