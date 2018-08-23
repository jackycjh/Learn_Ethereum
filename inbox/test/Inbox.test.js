const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const defaultMessage = 'Hi there!';
beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of the accounts to deploy contract
  inbox = await new web3.eth.Contract( JSON.parse(interface) )
    .deploy({ data: bytecode, arguments: [defaultMessage] })
    .send({ from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has default message', async () => {
    const result = await inbox.methods.message().call();
    assert.equal(result, defaultMessage);
  });

  it('can set message', async () => {
    newMessage = 'Yay!';

    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    const result = await inbox.methods.message().call();

    assert.equal(result, newMessage);
  });
});