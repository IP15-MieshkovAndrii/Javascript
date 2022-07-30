const createPath = require('../helpers/create-path')
const superagent = require('superagent')

const getRate = (req, res) => {
    const title = 'Rate';
    superagent
        .get('https://api.exchangerate.host/latest?base=BTC&symbols=UAH')
        .end((err, result) => {
            if(err){
                const rate = undefined;
                result
                    .status(400)
                    .render(createPath('rate'), {rate, title});
            } else{
                const data = JSON.parse(result.text);
                const to = 'UAH';
                const rate = data.rates[to]; 
                const number = req.query.number;
                const numberUAH = number * rate;
                res.render(createPath('rate'), {rate, numberUAH, title});
            }
        })
}

module.exports = getRate;