const createPath = require('../helpers/create-path')
const fs = require('fs');

const handleError = (req, res) => {
    res.status(500).send(error);
}

const addMail = (req, res) => {
    const email = req.body.title; 
    const post = new Object({ email});
    post
        .save()
        .then((post) => res.status(200).json(post))
        .catch((error) => handleError(res, error));
}

module.exports = {
    addMail,
};