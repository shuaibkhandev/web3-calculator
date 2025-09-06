"use client";

import React, { useEffect, useState } from "react";
import getWeb3 from "../lib/getWeb3";
import { getCalculatorContract } from "../lib/contractConfig";

const Calculator = () => {
  const [web3, setWeb3] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string>("");
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = await getWeb3();
        const accounts = await web3Instance.eth.getAccounts();
        const contractInstance = await getCalculatorContract(web3Instance);

        setWeb3(web3Instance);
        setContract(contractInstance);
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Web3 init failed:", err);
        setError("Failed to connect with Web3.");
      }
    };

    init();
  }, []);

  const handleOperation = async (operation: string) => {
    if (!contract || !account) return;

    try {
      let tx;
      switch (operation) {
        case "add":
          tx = await contract.methods.add(a, b).send({ from: account });
          break;
        case "sub":
          tx = await contract.methods.subtrict(a, b).send({ from: account });
          break;
        case "mul":
          tx = await contract.methods.mutiply(a, b).send({ from: account });
          break;
        case "div":
          tx = await contract.methods.divide(a, b).send({ from: account });
          break;
      }
      const res = await contract.methods.getResult().call();
      setResult(res.toString());
    } catch (err: any) {
      console.error("Transaction failed:", err);
      setError("Transaction failed! Maybe invalid input?");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-lg mt-[50px]">
      <h1 className="text-3xl font-bold text-center mb-6">🧮 Blockchain Calculator</h1>

      {account && (
        <p className="text-sm text-gray-500 mb-4">
          Connected Account: <span className="font-mono">{account}</span>
        </p>
      )}

      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-600">{error}</div>
      )}

      {/* Input Fields */}
      <div className="flex gap-4 mb-6">
        <input
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Enter first number"
          className="w-1/2 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
        <input
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Enter second number"
          className="w-1/2 p-2 border rounded focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => handleOperation("add")}
          className="py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ➕ Add
        </button>
        <button
          onClick={() => handleOperation("sub")}
          className="py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➖ Subtract
        </button>
        <button
          onClick={() => handleOperation("mul")}
          className="py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          ✖ Multiply
        </button>
        <button
          onClick={() => handleOperation("div")}
          className="py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          ➗ Divide
        </button>
      </div>

      {/* Result */}
      <div className="text-center">
        <h2 className="text-lg font-semibold">Result:</h2>
        <p className="text-2xl font-bold text-blue-600 mt-2">
          {result !== "" ? result : "No calculation yet"}
        </p>
      </div>
    </div>
  );
};

export default Calculator;
