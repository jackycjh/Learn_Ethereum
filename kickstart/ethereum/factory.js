import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xCC06B1824fb86F1965cA16e97c05312C6752EDD2' // Rinkeby version: 2
);

export default instance;