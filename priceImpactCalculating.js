const { ethers, BigNumber } = require('ethers')
const axios = require('axios')

const DataStore = require('./jsonFiles/DataStore.json')
const pricesData = require('./jsonFiles/pricesData.json') // temporarily

const MARKETADDRESS =  '0x09400D9DB990D5ed3f35D7be61DfAEB900Af03C9' // sol - usdc
//const INDEXTOKEN = '0x2bcC6D6CdBbDC0a4071e48bb3B969b06B3330c07' // sol
const LONGTOKEN = '0x2bcC6D6CdBbDC0a4071e48bb3B969b06B3330c07' // sol
const SHORTTOKEN = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831' // usdc

const DATASTORE_CONTRACT = '0xFD70de6b91282D8017aA4E741e9Ae325CAb992d8'
//const customSizeDeltaUsd = BigNumber.from('0x09d8c68736c96f26dcf862c00000')


const getTokenPrice = async (address) => {
  //const url = 'https://arbitrum-api.gmxinfra.io/prices/tickers' // localhost always be forbidden for a while
  //const res = await axios.get(url)
  const res = pricesData
  console.log('prices res', res);
  const price = res.data.find((item)=>item.tokenAddress === address)
  console.log('token ' + address + ' price', price);
  return price
}

const useEncodeData = () => {
  function hashData(dataTypes, dataValues) {
    const bytes = ethers.utils.defaultAbiCoder.encode(dataTypes, dataValues);
    const hash = ethers.utils.keccak256(ethers.utils.arrayify(bytes));

    return hash;
  }

  function hashString(string) {
    return hashData(['string'], [string]); }

  const POSITION_IMPACT_FACTOR_KEY = hashString('POSITION_IMPACT_FACTOR');

  function positionImpactFactorKey(market, isPositive) {
    return hashData(['bytes32', 'address', 'bool'], [POSITION_IMPACT_FACTOR_KEY, market, isPositive]);
  }

  const positionImpactFactorPositive = positionImpactFactorKey(MARKETADDRESS, true)
  console.log('positionImpactFactorPositive: ', positionImpactFactorPositive)

  const positionImpactFactorNegative = positionImpactFactorKey(MARKETADDRESS, false)
  console.log('positionImpactFactorNegative: ', positionImpactFactorNegative)


  const POSITION_IMPACT_EXPONENT_FACTOR_KEY = hashString('POSITION_IMPACT_EXPONENT_FACTOR');

  function positionImpactExponentFactorKey(market) {
    return hashData(['bytes32', 'address'], [POSITION_IMPACT_EXPONENT_FACTOR_KEY, market]);
  }

  const positionImpactExponentFactor = positionImpactExponentFactorKey(MARKETADDRESS)

  console.log('positionImpactExponentFactor: ', positionImpactExponentFactor)

  const OPEN_INTEREST_KEY = hashString('OPEN_INTEREST');

  function openInterestKey(market, collateralToken, isLong) {
    return hashData(
      ['bytes32', 'address', 'address', 'bool'],
      [OPEN_INTEREST_KEY, market, collateralToken, isLong],
    );
  }

  const longInterestUsingLongToken = openInterestKey(MARKETADDRESS, LONGTOKEN, true)
  const longInterestUsingShortToken = openInterestKey(MARKETADDRESS, SHORTTOKEN, true)

  const shortInterestUsingLongToken = openInterestKey(MARKETADDRESS, LONGTOKEN, false)
  const shortInterestUsingShortToken = openInterestKey(MARKETADDRESS, SHORTTOKEN, false)

  console.log('longInterestUsingLongToken: ',longInterestUsingLongToken)
  console.log('longInterestUsingShortToken: ',longInterestUsingShortToken)

  console.log('shortInterestUsingLongToken: ',shortInterestUsingLongToken )
  console.log('shortInterestUsingShortToken: ',shortInterestUsingShortToken)



  // calculating
  //const longInterestUsingLongTokenRes = BigNumber.from('78489071584611417052229912220000000');
  //const longInterestUsingShortTokenRes = BigNumber.from('7121600726869679307929138903677500000');
  //const shortInterestUsingLongTokenRes = BigNumber.from('1125249028778357072637879620900000000');
  //const shortInterestUsingShortTokenRes = BigNumber.from('5868057609751514477674391845000000000');


  //const longInterestUsd = longInterestUsingLongTokenRes.add(longInterestUsingShortTokenRes);
  //const shortInterestUsd = shortInterestUsingLongTokenRes.add(shortInterestUsingShortTokenRes);

  //console.log('longInterestUsd: ', longInterestUsd)
  //console.log('shortInterestUsd: ', shortInterestUsd)

  return {
    positionImpactFactorPositive,
    positionImpactFactorNegative,
    positionImpactExponentFactor,
    longInterestUsingLongToken,
    longInterestUsingShortToken,
    shortInterestUsingLongToken,
    shortInterestUsingShortToken
  }

}

// old constants
const usdcSolMarketInfo = {
    //"marketTokenAddress": "0x09400D9DB990D5ed3f35D7be61DfAEB900Af03C9",
    //"indexTokenAddress": "0x2bcC6D6CdBbDC0a4071e48bb3B969b06B3330c07",
    //"longTokenAddress": "0x2bcC6D6CdBbDC0a4071e48bb3B969b06B3330c07",
    //"shortTokenAddress": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    //"isSameCollaterals": false,
    //"isSpotOnly": false,
    //"name": "SOL/USD [SOL-USDC]",
    //"data": "",
    //"isDisabled": false,
    //"longToken": {
    //    "name": "Wrapped SOL (Wormhole)",
    //    "symbol": "SOL",
    //    "decimals": 9,
    //    "address": "0x2bcC6D6CdBbDC0a4071e48bb3B969b06B3330c07",
    //    "imageUrl": "https://assets.coingecko.com/coins/images/4128/small/solana.png?1640133422",
    //    "coingeckoUrl": "https://www.coingecko.com/en/coins/solana",
    //    "explorerUrl": "https://arbiscan.io/token/0x2bCc6D6CdBbDC0a4071e48bb3B969b06B3330c07",
    //    "prices": {
    //        "minPrice": {
    //            "type": "BigNumber",
    //            "hex": "0x04fd5106c4ebd2a5c53050000000"
    //        },
    //        "maxPrice": {
    //            "type": "BigNumber",
    //            "hex": "0x04fda11bf81e504744ff10c00000"
    //        }
    //    },
    //    "balance": {
    //        "type": "BigNumber",
    //        "hex": "0x00"
    //    }
    //},
    //"shortToken": {
    //    "name": "USD Coin",
    //    "symbol": "USDC",
    //    "decimals": 6,
    //    "address": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    //    "isStable": true,
    //    "isV1Available": true,
    //    "imageUrl": "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    //    "coingeckoUrl": "https://www.coingecko.com/en/coins/usd-coin",
    //    "explorerUrl": "https://arbiscan.io/address/0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    //    "prices": {
    //        "minPrice": {
    //            "type": "BigNumber",
    //            "hex": "0x0c9f1dbf849f8ce26504c00000"
    //        },
    //        "maxPrice": {
    //            "type": "BigNumber",
    //            "hex": "0x0c9f7081edfdb8dfdd64000000"
    //        }
    //    },
    //    "balance": {
    //        "type": "BigNumber",
    //        "hex": "0x00"
    //    }
    //},
    //"indexToken": {
    //    "name": "Wrapped SOL (Wormhole)",
    //    "symbol": "SOL",
    //    "decimals": 9,
    //    "address": "0x2bcC6D6CdBbDC0a4071e48bb3B969b06B3330c07",
    //    "imageUrl": "https://assets.coingecko.com/coins/images/4128/small/solana.png?1640133422",
    //    "coingeckoUrl": "https://www.coingecko.com/en/coins/solana",
    //    "explorerUrl": "https://arbiscan.io/token/0x2bCc6D6CdBbDC0a4071e48bb3B969b06B3330c07",
    //    "prices": {
    //        "minPrice": {
    //            "type": "BigNumber",
    //            "hex": "0x04fd5106c4ebd2a5c53050000000"
    //        },
    //        "maxPrice": {
    //            "type": "BigNumber",
    //            "hex": "0x04fda11bf81e504744ff10c00000"
    //        }
    //    },
    //    "balance": {
    //        "type": "BigNumber",
    //        "hex": "0x00"
    //    }
    //},
    "longInterestUsd": BigNumber.from("0x056ca94e2187261d8aa72c6b78e7d960"),
    "shortInterestUsd": BigNumber.from('0x053e25ea799b36daad270c1760e90300'),
    "positionImpactFactorPositive": BigNumber.from("0x01c30731cec0320000"),
    "positionImpactFactorNegative": BigNumber.from("0x03860e639d80640000"),
    "positionImpactExponentFactor": BigNumber.from("0x1d07b368abd540233460000000"),
}

const initContract = () => {
  const provider = new ethers.providers.JsonRpcProvider('https://1rpc.io/arb') // arb
  return new ethers.Contract(DATASTORE_CONTRACT, DataStore.abi, provider)
}

const opts = {
  //fallbackToZero = false // !isIncrease
}

function getPriceImpactForPosition(marketInfo, sizeDeltaUsd, isLong, opts)  {

  const { longInterestUsd, shortInterestUsd } = marketInfo;
  const { currentLongUsd, currentShortUsd, nextLongUsd, nextShortUsd } = getNextOpenInterestParams({
    currentLongUsd: longInterestUsd,
    currentShortUsd: shortInterestUsd,
    usdDelta: sizeDeltaUsd,
    isLong: isLong,
  });

  const priceImpactUsd = getPriceImpactUsd({
    currentLongUsd,
    currentShortUsd,
    nextLongUsd,
    nextShortUsd,
    factorPositive: marketInfo.positionImpactFactorPositive,
    factorNegative: marketInfo.positionImpactFactorNegative,
    exponentFactor: marketInfo.positionImpactExponentFactor,
    fallbackToZero: opts.fallbackToZero, // !isincrease
  });
  return priceImpactUsd
}


function getNextOpenInterestParams(p) {
  const { currentLongUsd, currentShortUsd, usdDelta, isLong } = p;

  let nextLongUsd = currentLongUsd;
  let nextShortUsd = currentShortUsd;

  if (isLong) {
    nextLongUsd = currentLongUsd?.add(usdDelta || 0);
  } else {
    nextShortUsd = currentShortUsd?.add(usdDelta || 0);
  }

  return {
    currentLongUsd,
    currentShortUsd,
    nextLongUsd,
    nextShortUsd,
  };
}

// @description p
// currentLongUsd: BigNumber;
// currentShortUsd: BigNumber;
// nextLongUsd: BigNumber;
// nextShortUsd: BigNumber;
// factorPositive: BigNumber;
// factorNegative: BigNumber;
// exponentFactor: BigNumber;
// fallbackToZero?: boolean;
function getPriceImpactUsd(p) {
  const { nextLongUsd, nextShortUsd } = p;

  if (nextLongUsd.lt(0) || nextShortUsd.lt(0)) {
    if (p.fallbackToZero) {
      return BigNumber.from(0);
    } else {
      throw new Error("Negative pool amount");
    }
  }

  const currentDiff = p.currentLongUsd.sub(p.currentShortUsd).abs();
  const nextDiff = nextLongUsd.sub(nextShortUsd).abs();

  const isSameSideRebalance = p.currentLongUsd.lt(p.currentShortUsd) === nextLongUsd.lt(nextShortUsd);

  let impactUsd;

  if (isSameSideRebalance) {
    const hasPositiveImpact = nextDiff.lt(currentDiff);
    const factor = hasPositiveImpact ? p.factorPositive : p.factorNegative;

    impactUsd = calculateImpactForSameSideRebalance({
      currentDiff,
      nextDiff,
      hasPositiveImpact,
      factor,
      exponentFactor: p.exponentFactor,
    });
  } else {
    impactUsd = calculateImpactForCrossoverRebalance({
      currentDiff,
      nextDiff,
      factorPositive: p.factorPositive,
      factorNegative: p.factorNegative,
      exponentFactor: p.exponentFactor,
    });
  }

  return impactUsd;
}


// @description p
// currentDiff: BigNumber;
// nextDiff: BigNumber;
// hasPositiveImpact: boolean;
// factor: BigNumber;
// exponentFactor: BigNumber;
function calculateImpactForSameSideRebalance(p) {
  const { currentDiff, nextDiff, hasPositiveImpact, factor, exponentFactor } = p;

  const currentImpact = applyImpactFactor(currentDiff, factor, exponentFactor);
  const nextImpact = applyImpactFactor(nextDiff, factor, exponentFactor);

  const deltaDiff = currentImpact.sub(nextImpact).abs();

  return hasPositiveImpact ? deltaDiff : BigNumber.from(0).sub(deltaDiff);
}


// @description p
// currentDiff: BigNumber;
// nextDiff: BigNumber;
// factorPositive: BigNumber;
// factorNegative: BigNumber;
// exponentFactor: BigNumber;
function calculateImpactForCrossoverRebalance(p) {
  const { currentDiff, nextDiff, factorNegative, factorPositive, exponentFactor } = p;

  const positiveImpact = applyImpactFactor(currentDiff, factorPositive, exponentFactor);
  const negativeImpactUsd = applyImpactFactor(nextDiff, factorNegative, exponentFactor);

  const deltaDiffUsd = positiveImpact.sub(negativeImpactUsd).abs();

  return positiveImpact.gt(negativeImpactUsd) ? deltaDiffUsd : BigNumber.from(0).sub(deltaDiffUsd);
}

function applyImpactFactor(diff, factor, exponent) {
  // Convert diff and exponent to float js numbers
  const _diff = Number(diff) / 10 ** 30;
  const _exponent = Number(exponent) / 10 ** 30;

  // Pow and convert back to BigNumber with 30 decimals
  let result = bigNumberify(BigInt(Math.round(_diff ** _exponent * 10 ** 30)));

  result = result.mul(factor).div(expandDecimals(1, 30));

  return result;
}

function bigNumberify(n) {
  try {
    return BigNumber.from(n);
  } catch (e) {
    console.error("bigNumberify error", e);
    return undefined;
  }
}

function expandDecimals(n, decimals) {
  return bigNumberify(n).mul(bigNumberify(10).pow(decimals));
}



async function getMarketInfoData() {
  const contract = initContract()
  const { positionImpactFactorPositive, positionImpactFactorNegative, positionImpactExponentFactor, longInterestUsingLongToken, longInterestUsingShortToken, shortInterestUsingLongToken, shortInterestUsingShortToken } = useEncodeData()
  console.log('contract = ', positionImpactFactorPositive)
  const [pifp, pifn, pief, lul, lus, sul, sus] = await Promise.all([
    contract['getUint'].apply(null, [positionImpactFactorPositive]),
    contract['getUint'].apply(null, [positionImpactFactorNegative]),
    contract['getUint'].apply(null, [positionImpactExponentFactor]),
    contract['getUint'].apply(null, [longInterestUsingLongToken]),
    contract['getUint'].apply(null, [longInterestUsingShortToken]),
    contract['getUint'].apply(null, [shortInterestUsingLongToken]),
    contract['getUint'].apply(null, [shortInterestUsingShortToken]),
  ])
  console.log(pifp, pifn, pief, lul, lus, sul, sus)

  const longInterestUsingLongTokenRes = BigNumber.from(lul);
  const longInterestUsingShortTokenRes = BigNumber.from(lus);
  const shortInterestUsingLongTokenRes = BigNumber.from(sul);
  const shortInterestUsingShortTokenRes = BigNumber.from(sus);


  const longInterestUsd = longInterestUsingLongTokenRes.add(longInterestUsingShortTokenRes);
  const shortInterestUsd = shortInterestUsingLongTokenRes.add(shortInterestUsingShortTokenRes);

  console.log('longInterestUsd: ', longInterestUsd)
  console.log('shortInterestUsd: ', shortInterestUsd)
  return {
    longInterestUsd,
    shortInterestUsd,
    positionImpactFactorPositive: pifp,
    positionImpactFactorNegative: pifn,
    positionImpactExponentFactor: pief,
  }
}

async function getPriceImpact(isLong, amount) {
  //const priceImpact = getPriceImpactForPosition(usdcSolMarketInfo, customSizeDeltaUsd, isLong, opts) // old
  const marketInfo = await getMarketInfoData()
  console.log('marketInfo: ', marketInfo);

  const priceObj = await getTokenPrice(LONGTOKEN)
  console.log('priceObj: ', priceObj)
  const formatAmount = ethers.utils.parseUnits(amount, 9) // TODO decimals
  console.log('formatAmount', formatAmount);
  const sizeDeltaUsd = BigNumber.from(priceObj.minPrice).mul(formatAmount)
  console.log('sizeDeltaUsd: ', sizeDeltaUsd)

  const priceImpact = await getPriceImpactForPosition(marketInfo, sizeDeltaUsd, isLong, opts)
  console.log(isLong ? '[long]' : '[short]' + 'latest priceImpact: ', priceImpact, 'with sizeDeltaUsd: ', sizeDeltaUsd);
  const formatPriceImpact = ethers.utils.formatUnits(priceImpact, 30)
  console.log(isLong ? '[long]' : '[short]' + 'latest format priceImpact: ', formatPriceImpact, 'with sizeDeltaUsd: ', sizeDeltaUsd);
  return formatPriceImpact
}

module.exports = {
  getPriceImpact
}

//const amount = '2.025952018'

//getPriceImpact(true, amount) // long
//getPriceImpact(false, amount) // short
//getTokenPrice(LONGTOKEN, 100)



