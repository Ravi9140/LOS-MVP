"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SanctionResult() {
  const [score, setScore] = useState(0);
  const [maxLoan, setMaxLoan] = useState(0);
  const [tenure, setTenure] = useState(1);

  useEffect(() => {
    const s = Number(localStorage.getItem("cibilScore"));
    const m = Number(localStorage.getItem("maxLoanAllowed"));
    setScore(isNaN(s) ? 0 : s);
    setMaxLoan(isNaN(m) ? 0 : m);
  }, []);

  const emi = Math.round(maxLoan / (tenure * 12));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto mt-10 max-w-md space-y-6 rounded-3xl bg-white/10 p-6 text-center backdrop-blur"
    >
      <h1 className="text-3xl font-bold">🎉 Your Offer Is Ready!</h1>
      <div className="flex justify-around">
        <motion.div whileHover={{ rotateY: 180 }} className="w-1/2 p-4">
          <div className="rounded-3xl bg-white/20 p-4 shadow">
            <p className="text-sm">CIBIL Score</p>
            <p className="text-2xl font-bold">{score}</p>
          </div>
        </motion.div>
        <motion.div whileHover={{ rotateY: 180 }} className="w-1/2 p-4">
          <div className="rounded-3xl bg-white/20 p-4 shadow">
            <p className="text-sm">Max Loan ₹</p>
            <p className="text-2xl font-bold">{maxLoan}</p>
          </div>
        </motion.div>
      </div>
      <div className="space-y-2">
        <p className="font-medium">Choose Tenure</p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((y) => (
            <button
              key={y}
              onClick={() => setTenure(y)}
              className={`rounded-full px-4 py-1 ${tenure === y ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {y} {y === 1 ? "Year" : "Years"}
            </button>
          ))}
        </div>
        <p className="text-lg">EMI preview: ₹{emi} / mo</p>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert("Accepted")}
          className="rounded-full bg-blue-600 px-4 py-2 text-white"
        >
          Accept Offer
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert("Declined")}
          className="rounded-full bg-orange-500 px-4 py-2 text-white"
        >
          Decline
        </motion.button>
      </div>
    </motion.div>
  );
}
