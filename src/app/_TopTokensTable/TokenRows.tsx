import { LoadingRows } from "@/components/LoadingRows";
import { formatUSDAmount } from "@/utils/formatUSDAmount";
import { getTokenIconSrc } from "@/utils/getTokenIconSrc";
import { useTokens } from "./useTokens";

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
        <div className="flex items-center gap-4">
          <img
            alt=""
            className="rounded-full"
            height={24}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "blank.png";
            }}
            src={getTokenIconSrc(token.id)}
            width={24}
          />
          <span className="inline md:hidden">{token.symbol}</span>
          <span className="hidden md:inline">
            {token.name} ({token.symbol})
          </span>
        </div>
      </td>
      <td className="px-4">
        {formatUSDAmount(token.tokenDayData[0].priceUSD)}
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
      <td className="px-4">{formatUSDAmount(token.totalValueLockedUSD)}</td>
    </tr>
  ));
}
