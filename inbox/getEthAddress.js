require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const printAccounts = async () => {
  // get 21 accounts
  for(var i=0; i<=21; i++) {
    const provider = new HDWalletProvider(
      process.env.mnemomic,
      process.env.infura_url,
      i);
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();

    console.log("Account[" + i + "]: " + accounts[0]);
  }
};
printAccounts();