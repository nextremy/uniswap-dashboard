import { LoadingRows } from "@/components/LoadingRows";
import { getTokenIconSrc } from "@/utils/getTokenIconSrc";
import { usePools } from "./usePools";

type PoolRowsProps = {
  page: number;
};

export function PoolRows({ page }: PoolRowsProps) {
  const { pools, fetchingPools } = usePools();

  if (!pools || fetchingPools) {
    return <LoadingRows columnCount={4} rowCount={10} />;
  }
  const poolsPage = pools.slice((page - 1) * 10, (page - 1) * 10 + 10);
  return poolsPage.map((pool, poolIndex) => (
    <tr className="h-16" key={pool.id}>
      <td className="px-4">{(page - 1) * 10 + (poolIndex + 1)}</td>
      <td className="px-4">
        <div className="flex h-16 items-center gap-4">
          <div className="relative w-10">
            <img
              alt=""
              className="rounded-full"
              height={24}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "blank.png";
              }}
              src={getTokenIconSrc(pool.token0.id)}
              width={24}
            />
            <img
              alt=""
              className="absolute left-4 top-0 rounded-full"
              height={24}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "blank.png";
              }}
              src={getTokenIconSrc(pool.token1.id)}
              width={24}
            />
          </div>
          {pool.token0.symbol}/{pool.token1.symbol}
        </div>
      </td>
      <td className="px-4">
        $
        {Intl.NumberFormat("en", { notation: "compact" }).format(
          pool.totalValueLockedUSD,
        )}
      </td>
      <td className="px-4">
        $
        {Intl.NumberFormat("en", { notation: "compact" }).format(
          pool.poolDayData[0].volumeUSD,
        )}
      </td>
    </tr>
  ));
}
