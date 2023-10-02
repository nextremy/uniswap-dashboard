import { PoolsDocument } from "@/gql/graphql";
import { useQuery } from "urql";

export function usePools() {
  const [{ data, fetching, stale }, reexecuteQuery] = useQuery({
    query: PoolsDocument,
  });

  return {
    pools: data?.pools,
    fetchingPools: fetching || stale,
    refreshPools: () => reexecuteQuery({ requestPolicy: "network-only" }),
  };
}
