import { ReactNode } from "react";

type HeadProps = {
  children: ReactNode;
};

export function Head({ children }: HeadProps) {
  return <thead>{children}</thead>;
}
