import { TokensDocument } from "@/gql/graphql";
import { useQuery } from "urql";

export function useTokens() {
  const [{ data, fetching, stale }, reexecuteQuery] = useQuery({
    query: TokensDocument,
  });

  return {
    tokens: data?.tokens,
    fetchingTokens: fetching || stale,
    refreshTokens: () => reexecuteQuery({ requestPolicy: "network-only" }),
  };
}
