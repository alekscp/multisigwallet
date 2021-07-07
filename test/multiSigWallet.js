const MultiSigWallet = artifacts.require("MultiSigWallet");

contract("MultiSigWallet", (accounts) => {
  let [approver1, approver2, approver3] = accounts
  let multiSigWallet

  before(async () => {
    multiSigWallet = await MultiSigWallet.deployed()
  })

  describe("createTransfer", () => {
    it("Creates a transfer", async () => {
      await multiSigWallet.createTransfer(1000, accounts[4], { from: approver1 })
      const transfer = await multiSigWallet.transfers(0)

      assert.equal(transfer.id.toNumber(), 0)
      assert.equal(transfer.amount.toNumber(), 1000)
    })
  })
});
