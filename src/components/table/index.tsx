import { IconButton } from "@/components/icon-button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";

type TableProps = {
  columns: ReactNode[];
  rows: ReactNode[][] | null;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export function Table({ columns, rows, page, setPage }: TableProps) {
  function handlePageInputChange(event: ChangeEvent<HTMLInputElement>) {
    const input = Number(event.target.value);
    if (isNaN(input) || input < 1) {
      setPage(1);
      return;
    }
    setPage(input);
  }

  return (
    <div className="overflow-x-auto rounded-lg border-2 border-gray-200 dark:border-gray-800">
      <table className="w-full border-collapse border-spacing-0 md:table-fixed">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            {columns.map((column, columnIndex) => (
              <th
                className="p-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
                key={columnIndex}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows
            ? rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td className="p-4 text-sm" key={cellIndex}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            : Array(10)
                .fill(null)
                .map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array(columns.length)
                      .fill(null)
                      .map((_, cellIndex) => (
                        <td className="p-4" key={cellIndex}>
                          <div className="h-5 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700" />
                        </td>
                      ))}
                  </tr>
                ))}
        </tbody>
      </table>
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
          onChange={handlePageInputChange}
          type="number"
          value={page}
        />
        <IconButton onClick={() => setPage((page) => page + 1)}>
          <ArrowRightIcon className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </IconButton>
      </nav>
    </div>
  );
}
