type LoadingRowsProps = {
  rowCount: number;
  columnCount: number;
};

export function LoadingRows({ rowCount, columnCount }: LoadingRowsProps) {
  return Array(rowCount)
    .fill(null)
    .map((_, index0) => (
      <tr key={index0}>
        {Array(columnCount)
          .fill(null)
          .map((_, index1) => (
            <td className="h-16 px-4" key={index1}>
              <div className="h-6 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
            </td>
          ))}
      </tr>
    ));
}
