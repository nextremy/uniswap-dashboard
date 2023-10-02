import { LoadingRows } from "@/components/loading-rows";
import { useTokens } from "./use-tokens";

type TokenRowsProps = {
  page: number;
};

export function TokenRows({ page }: TokenRowsProps) {
  const { tokens, fetchingTokens } = useTokens();

  if (!tokens || fetchingTokens) {
    return <LoadingRows columnCount={5} rowCount={10} />;
  }
  const tokensPage = tokens.slice((page - 1) * 10, (page - 1) * 10 + 10);
  return tokensPage.map((token, tokenIndex) => (
    <tr className="h-16" key={token.id}>
      <td className="px-4">{(page - 1) * 10 + (tokenIndex + 1)}</td>
      <td className="px-4">
        {token.name} ({token.symbol})
      </td>
      <td className="px-4">
        $
        {Intl.NumberFormat("en", { notation: "compact" }).format(
          token.tokenDayData[0].priceUSD,
        )}
      </td>
      <td className="px-4">
        {(() => {
          const currentPrice = Number(token.tokenDayData[0].priceUSD);
          const previousPrice = Number(token.tokenDayData[1].priceUSD);
          const changePercentage = (
            ((currentPrice - previousPrice) / previousPrice) *
            100
          ).toFixed(2);
          if (changePercentage.endsWith("0.00")) {
            return <span>0.00%</span>;
          } else if (changePercentage.startsWith("-")) {
            return (
              <span className="text-red-700 dark:text-red-300">
                {changePercentage}%
              </span>
            );
          } else {
            return (
              <span className="text-green-700 dark:text-green-300">
                {changePercentage}%
              </span>
            );
          }
        })()}
      </td>
      <td className="px-4">
        $
        {Intl.NumberFormat("en", { notation: "compact" }).format(
          token.totalValueLockedUSD,
        )}
      </td>
    </tr>
  ));
}
