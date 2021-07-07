const MultiSigWallet = artifacts.require("MultiSigWallet")

module.exports = function(deployer, network, accounts) {
  if (network == "development") {
    deployer.deploy(
      MultiSigWallet,
      [accounts[0], accounts[1], accounts[2]],
      2,
      { value: web3.utils.toWei("10", "ether") }
    );
  }
};
