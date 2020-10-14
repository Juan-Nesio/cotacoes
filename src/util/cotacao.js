const request = require('request')
//const chalk = require('chalk');

const cotacao = (symbol, callback) => {
    const url = `https://api.hgbrasil.com/finance/stock_price?key=bd5dab8b&symbol=${symbol}`
    const guardaSymbol = symbol
    request({ url: url, json: true }, (err, response) => {
        if (err) {
            const error = {
                message: `Algo saiu errado: ${err}`
            }
            return callback(null, error)
        }

        const json = response.body

        const { error } = Object.values(json.results)[0];

        if (error) {
            const { message } = Object.values(json.results)[0];
            return callback(null, message)
        }
        else {
            const { symbol, name, price } = Object.values(json.results)[0];

            const data = { symbol, name, price }
            //        const data = {
            //            symbol: valor.symbol,
            //            description: valor.name,
            //            price: valor.price
            //        }
            return callback(data)

        }
    })
}

module.exports = cotacao
