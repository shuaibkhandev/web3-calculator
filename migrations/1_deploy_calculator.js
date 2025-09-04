const Calculator = artifacts.require("../contracts/Calculator.sol");

module.exports = function(deployer){
    deployer.deploy(Calculator);
}