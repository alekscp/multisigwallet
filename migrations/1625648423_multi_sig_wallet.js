const MultiSigWallet = artifacts.require("MultiSigWallet")

module.exports = function(deployer, network, accounts) {
  if (network == "development") {
    deployer.deploy(
      MultiSigWallet,
      [accounts[0], accounts[1], accounts[2]],
      2,
      { value: web3.utils.toWei("1", "ether") }
    );
  } else if (network == "goerli") {
    deployer.deploy(
      MultiSigWallet,
      [accounts[0], accounts[1], accounts[2]],
      2,
      { value: web3.utils.toWei("5", "ether") }
    );
  }
};
