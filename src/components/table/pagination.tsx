import { IconButton } from "@/components/icon-button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export function Pagination({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const input = Number(event.target.value);
    if (isNaN(input) || input < 1) {
      setPage(1);
      return;
    }
    setPage(input);
  }

  return (
    <nav className="flex justify-center gap-2 p-2">
      <IconButton
        disabled={page === 1}
        onClick={() => setPage((page) => page - 1)}
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span className="sr-only">Back</span>
      </IconButton>
      <input
        className="w-10 rounded-md bg-gray-200 text-center font-medium text-blue-700 dark:bg-gray-800 dark:text-blue-300"
        min={1}
        onChange={handleInputChange}
        type="number"
        value={page}
      />
      <IconButton onClick={() => setPage((page) => page + 1)}>
        <ArrowRightIcon className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </IconButton>
    </nav>
  );
}
