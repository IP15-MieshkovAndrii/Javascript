const createPath = require('../helpers/create-path')
const superagent = require('superagent')

const handleError = (req, res) => {
    res.status(500).send(error);
}

const getRate = (req, res) => {
    res.send("{}");
}

module.exports = getRate;