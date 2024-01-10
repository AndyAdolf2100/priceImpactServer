const express = require('express')
const app = express()
const port = 6888
const pkg = require('./priceImpactCalculating.js');
const { getPriceImpact } = pkg;

app.get('/price_impact', async (req, res) => {

  //try {

    const amount = req.query.amount // string
    const isLong = req.query.isLong === 'true' // true or false string
    const marketAddress = req.query.marketAddress // string

    const priceImpact = await getPriceImpact(marketAddress, isLong, amount) // long

    console.log('priceImpact before render', priceImpact)
    console.log('priceImpact need to be rendered', priceImpact.toString())

    const json = {
      'isLong': isLong,
      'priceImpact': priceImpact.toString()
    }
    res.send(json)

  //} catch(error) {
  //  res.send(error)
  //}

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
