import { getAddress } from "viem";

export function getTokenIconSrc(address: string) {
  return `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/${getAddress(
    address,
  )}/logo.png`;
}
