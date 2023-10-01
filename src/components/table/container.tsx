import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="overflow-x-auto rounded-lg border-2 border-gray-200 dark:border-gray-800">
      {children}
    </div>
  );
}
