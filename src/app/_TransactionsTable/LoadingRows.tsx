export function LoadingRows() {
  return Array(10)
    .fill(null)
    .map((_, index0) => (
      <tr className="h-16" key={index0}>
        {Array(5)
          .fill(null)
          .map((_, index1) => (
            <td className="px-4" key={index1}>
              <div className="h-6 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
            </td>
          ))}
      </tr>
    ));
}
