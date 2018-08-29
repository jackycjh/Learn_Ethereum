import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // In the browser, with injected web3.
  web3 = new Web3(window.web3.currentProvider);
} else {
  // In the server.
  const provider = new Web3.providers.HttpProvider(
    // TODO: Find a way to read backend config in Next server.
    'https://rinkeby.infura.io/0oZGa6RW8cC2M6nwzxML'
  );
  web3 = new Web3(provider);
}

export default web3;