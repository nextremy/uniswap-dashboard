import { ReactNode } from "react";

type BodyProps = {
  children: ReactNode;
};

export function Body({ children }: BodyProps) {
  return <tbody>{children}</tbody>;
}
