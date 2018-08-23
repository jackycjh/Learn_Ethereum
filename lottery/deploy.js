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
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log(interface);
  console.log('Contract deployed to', tx.options.address);
};
// deploy();

// TxHash: 0xc277f61aa64b72d3d3450ca9c18acedf38b55a3b91c42a1ac8855a32661edc96
// Address: 0x5d2a007b5021236f654e1c3d43f76fb2bbed9b2e