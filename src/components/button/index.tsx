import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

const button = cva(
  "flex h-10 items-center gap-2 rounded-md px-4 font-semibold duration-150 disabled:opacity-50",
  {
    variants: {
      intent: {
        secondary:
          "bg-gray-200 enabled:hover:bg-gray-300 dark:bg-gray-800 enabled:dark:hover:bg-gray-700",
      },
    },
  },
);

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof button>;

export function Button({ className, intent, ...props }: ButtonProps) {
  return <button className={button({ className, intent })} {...props} />;
}
