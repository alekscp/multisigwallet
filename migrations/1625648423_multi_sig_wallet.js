const MultiSigWallet = artifacts.require("MultiSigWallet")

module.exports = function(deployer, network, accounts) {
  if (network == "development") {
    deployer.deploy(
      multisigwallet,
      [accounts[0], accounts[1], accounts[2]],
      2,
      { value: web3.utils.towei("1", "ether") }
    );
  } else if (network == "goerli") {
    deployer.deploy(
      multisigwallet,
      [accounts[0], accounts[1], accounts[2]],
      2,
      { value: web3.utils.towei("5", "ether") }
    );
  }
};
