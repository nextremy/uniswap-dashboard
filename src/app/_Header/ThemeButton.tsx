"use client";

import { IconButton } from "@/components/IconButton";
import { Listbox, Transition } from "@headlessui/react";
import {
  ComputerDesktopIcon,
  MoonIcon as MoonIcon20Solid,
  SunIcon as SunIcon20Solid,
} from "@heroicons/react/20/solid";
import {
  MoonIcon as MoonIcon24Solid,
  SunIcon as SunIcon24Solid,
} from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useState } from "react";

export function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  return (
    <Listbox
      as="div"
      className="relative"
      onChange={(value) => setTheme(value)}
    >
      <IconButton asChild>
        <Listbox.Button>
          {resolvedTheme === "light" ? (
            <SunIcon24Solid className="h-6 w-6" />
          ) : (
            <MoonIcon24Solid className="h-6 w-6" />
          )}
          <span className="sr-only">Theme</span>
        </Listbox.Button>
      </IconButton>
      <Transition
        as={Fragment}
        enter="transition-opacity ease-out duration-200"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition-opacity ease-in duration-100"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <Listbox.Options className="absolute right-0 top-10 rounded-md border border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
          <Listbox.Option
            className={`flex h-12 cursor-pointer items-center gap-2 rounded-t-md px-4 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 ${
              theme === "light" ? "text-blue-700 dark:text-blue-300" : ""
            }`}
            value="light"
          >
            <SunIcon20Solid className="h-5 w-5" />
            Light
          </Listbox.Option>
          <Listbox.Option
            className={`flex h-12 cursor-pointer items-center gap-2 px-4 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 ${
              theme === "dark" ? "text-blue-700 dark:text-blue-300" : ""
            }`}
            value="dark"
          >
            <MoonIcon20Solid className="h-5 w-5" />
            Dark
          </Listbox.Option>
          <Listbox.Option
            className={`flex h-12 cursor-pointer items-center gap-2 rounded-b-md px-4 font-medium hover:bg-gray-200 dark:hover:bg-gray-800 ${
              theme === "system" ? "text-blue-700 dark:text-blue-300" : ""
            }`}
            value="system"
          >
            <ComputerDesktopIcon className="h-5 w-5" />
            System
          </Listbox.Option>
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
