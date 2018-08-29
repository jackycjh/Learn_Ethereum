import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x8da1A64e3f7575fbc335dBCDC5d8542468ebFeCa'
);

export default instance;