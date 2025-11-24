"use client";

import { useBalance } from "@repo/store/balance";

export default function BalanceDisplay() {
  const balance = useBalance();
  return <div>hi there {balance}</div>;
}

