import { VariantProps, cva } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

const iconButton = cva(
  "grid h-12 w-12 place-items-center rounded-md bg-gray-200 text-gray-700 duration-150 enabled:hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 enabled:dark:hover:bg-gray-700",
);

type IconButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof iconButton>;

export function IconButton({ className, ...props }: IconButtonProps) {
  return <button className={iconButton({ className })} {...props} />;
}
