import Calculator from "../contracts/Calculator.json";

export const getCalculatorContract = async (web3: any) => {
  const networkId = await web3.eth.net.getId();  
 
  const deployedNetwork = (Calculator.networks as any)[networkId];
  if (!deployedNetwork) {
    throw new Error(`Calculator contract not deployed on network with ID ${networkId}`);
  }

  return new web3.eth.Contract(Calculator.abi, deployedNetwork.address);
};
