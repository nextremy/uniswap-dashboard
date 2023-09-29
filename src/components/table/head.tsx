import { ReactNode } from "react";

export function Head(props: { children: ReactNode }) {
  return <thead>{props.children}</thead>;
}
