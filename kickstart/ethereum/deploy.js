require('dotenv').config();

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

console.log("Mnemomic is", process.env.mnemomic);
console.log("Infura URL is", process.env.infura_url);

const provider = new HDWalletProvider(
  process.env.mnemomic,
  process.env.infura_url);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const tx = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ from: accounts[0] });

  console.log('Contract deployed to', tx.options.address);
};
deploy();

// TxHash: 0xe463d4ac99a7fb1ea10463581711afe800605524f0608b8f335affe2d040dd75
// Address: 0x8da1A64e3f7575fbc335dBCDC5d8542468ebFeCa