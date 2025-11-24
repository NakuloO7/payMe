"use client";

import { Suspense } from "react";
import dynamicImport from "next/dynamic";

export const dynamic = 'force-dynamic';

const BalanceDisplay = dynamicImport(() => import("./BalanceDisplay"), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BalanceDisplay />
    </Suspense>
  );
}