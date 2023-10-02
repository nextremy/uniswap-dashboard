import { IconButton } from "@/components/IconButton";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction } from "react";

type TablePaginationProps = {
  page: number;
  pageCount?: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export function TablePagination({
  page,
  pageCount,
  setPage,
}: TablePaginationProps) {
  return (
    <nav className="flex justify-center gap-2 p-2">
      <IconButton
        disabled={page === 1}
        onClick={() => setPage((page) => page - 1)}
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span className="sr-only">Back</span>
      </IconButton>
      <div className="grid w-12 place-items-center rounded-md bg-gray-200 font-medium text-blue-700 dark:bg-gray-800 dark:text-blue-300">
        {page}
      </div>
      <IconButton
        disabled={pageCount === undefined || page === pageCount}
        onClick={() => setPage((page) => page + 1)}
      >
        <ArrowRightIcon className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </IconButton>
    </nav>
  );
}
