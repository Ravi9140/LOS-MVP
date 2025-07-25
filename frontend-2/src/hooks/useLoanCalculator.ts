"use client";
import { useMemo } from "react";

export function useLoanCalculator(
  amount: number,
  tenureYears: 1 | 2 | 3,
  cibilScore?: number
) {
  return useMemo(() => {
    const score =
      typeof cibilScore === "number"
        ? cibilScore
        : Number(localStorage.getItem("cibilScore")) || 0;
        
    let rate = 18 - ((score - 300) / 600) * 7;
    rate = Math.min(18, Math.max(11, rate));
    rate = Math.round(rate * 100) / 100;
    const processingFee = Math.max(amount * 0.015, 999);
    const legalFee = 2000;
    const sanctionedMax = Number(localStorage.getItem("maxLoanAllowed")) || 0;
    const cashback = amount >= 0.8 * sanctionedMax ? amount * 0.0025 : 0;
    const monthlyRate = rate / 12 / 100;
    const tenureMonths = tenureYears * 12;
    const emi =
      amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -tenureMonths));
    const netDisbursed = amount - processingFee - legalFee + cashback;

    return { rate, processingFee, legalFee, cashback, emi, netDisbursed };
  }, [amount, tenureYears, cibilScore]);
}
