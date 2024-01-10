const { ethers } = require('ethers')
const SyntheticsReader = require('./jsonFiles/synthetics-reader.json')

const SYNTHETICSREADER_ADDRESS = '0xf60becbba223EEA9495Da3f606753867eC10d139'
const DATASTORE_CONTRACT = '0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8'
const MARKETS_COUNT = 100

const initContract = () => {
  const provider = new ethers.providers.JsonRpcProvider('https://1rpc.io/arb') // arb
  return new ethers.Contract(SYNTHETICSREADER_ADDRESS, SyntheticsReader, provider)
}

async function getMarketData() {
  const contract = initContract()
  const marketsData = await contract['getMarkets'].apply(null, [DATASTORE_CONTRACT, 0, MARKETS_COUNT])
  //console.log(marketsData);
  return marketsData
}

//getMarketData()

module.exports = {
  getMarketData
}
