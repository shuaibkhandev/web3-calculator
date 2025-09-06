"use client";

import React, { useEffect, useState } from "react";
import getWeb3 from "../lib/getWeb3";
import { getCalculatorContract } from "../lib/contractConfig";
const Calculator = () => {
      const [web3, setWeb3] = useState<any>(null);
      const [contract, setContract] = useState<any>(null);
  const [account, setAccount] = useState<string>("");
    const [error, setError] = useState<string>("");
console.log(account)
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
      }
    };

    init();
  }, []);

  return (
    <div>
      <h1>Calculator Cmponent</h1>
    </div>
  )
}

export default Calculator
