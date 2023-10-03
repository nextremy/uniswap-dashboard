const formatter = Intl.NumberFormat("en", { notation: "compact" });

export function formatUSDAmount(amount: number | string) {
  amount = Number(amount);
  if (amount < 0.001) {
    return "<$0.001";
  }
  return `$${formatter.format(amount)}`;
}
