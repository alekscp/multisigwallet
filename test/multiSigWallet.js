const { expectRevert } = require('@openzeppelin/test-helpers');

const MultiSigWallet = artifacts.require('MultiSigWallet');

contract('MultiSigWallet', (accounts) => {
  let [approver1, approver2, approver3, recipient1, recipient2, nonApprover] = accounts;
  let multiSigWallet;

  let transferId = 0

  before(async () => {
    multiSigWallet = await MultiSigWallet.deployed()
  });

  describe('createTransfer', () => {
    it('Creates a transfer', async () => {
      await multiSigWallet.createTransfer(1000, recipient1, { from: approver1 });
      const transfer = await multiSigWallet.transfers(transferId);

      assert.equal(transfer.id.toNumber(), transferId);
      assert.equal(transfer.amount.toNumber(), 1000);

      transferId++
    });

    it('Fails when called by non-approver account', async () => {
      await expectRevert(
        multiSigWallet.createTransfer(1000, nonApprover, { from: nonApprover }),
        'Only approver allowed'
      );
    });
  });

  describe('sendTransfer', () => {
    it('Sends transfer if quorum is reached', async () => {
      const recipientBalanceBefore = web3.utils.toBN(await web3.eth.getBalance(recipient2));

      await multiSigWallet.createTransfer(1000, recipient2, { from: approver1 })
      await multiSigWallet.sendTransfer(transferId, { from: approver2 })
      await multiSigWallet.sendTransfer(transferId, { from: approver3 })

      const recipientBalanceAfter = web3.utils.toBN(await web3.eth.getBalance(recipient2));

      const difference = recipientBalanceAfter.sub(recipientBalanceBefore)

      assert.equal(difference.toNumber(), 1000)

      transferId++
    })
  });
});
