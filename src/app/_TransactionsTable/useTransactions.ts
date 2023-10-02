import { TransactionsDocument } from "@/gql/graphql";
import { useQuery } from "urql";

export function useTransactions() {
  const [{ data, fetching, stale }, reexecuteQuery] = useQuery({
    query: TransactionsDocument,
  });
  const transactions = data?.transactions
    .map((transaction) => [
      ...transaction.swaps,
      ...transaction.mints,
      ...transaction.burns,
    ])
    .flat()
    .filter(
      (transaction): transaction is NonNullable<typeof transaction> =>
        transaction !== null,
    )
    .filter(
      (
        transaction,
      ): transaction is typeof transaction & { __typename: string } =>
        transaction!.__typename !== undefined,
    );

  return {
    transactions,
    fetchingTransactions: fetching || stale,
    refreshTransactions: () =>
      reexecuteQuery({ requestPolicy: "network-only" }),
  };
}
