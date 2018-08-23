require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require("./compile");

console.log("Mnemomic is", process.env.mnemomic);
console.log("Infura URL is", process.env.infura_url);

const provider = new HDWalletProvider(
  process.env.mnemomic,
  process.env.infura_url);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const tx = await new web3.eth.Contract( JSON.parse(interface) )
    .deploy({ data: bytecode, arguments: ['Hello!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', tx.options.address);
};
// deploy();

// TxHash: 0xd1fac3df55d076e8628bb2c165f1017bc23840003e738a750f9411df95b86875
// Address: 0x0568f92787497c6b2e985fa26f4640e20778b382