import Web3 from "web3";

const getWeb3 = async (): Promise<Web3> => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    const web3 = new Web3((window as any).ethereum);
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    return web3;
  }
  if (typeof window !== "undefined" && (window as any).web3) {
    return (window as any).web3;
  }

  // fallback (e.g. Ganache)
  const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
  return new Web3(provider);
};

export default getWeb3;
