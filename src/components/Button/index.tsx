import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

const button = cva(
  "flex h-12 items-center gap-2 rounded-md px-4 font-semibold duration-150 disabled:opacity-50",
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
  VariantProps<typeof button> & {
    asChild?: boolean;
  };

export function Button({ className, intent, asChild, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return <Component className={button({ className, intent })} {...props} />;
}
