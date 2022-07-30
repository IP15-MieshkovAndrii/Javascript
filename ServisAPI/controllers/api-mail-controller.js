const createPath = require('../helpers/create-path')
const fs = require('fs');

const handleError = (req, res) => {
    res.status(500).send(error);
}

const getMail = (req, res) => {
    console.log('Yes');
}

const getMails = (req, res) => {
    const Mail = fs.readFileSync('base.json', 'utf8');
    const Mails = JSON.parse(Mail);
    let mails = Mails;
    try{
        (error) => res.status(200).json(mails)
    }catch{
        (error) => handleError(res, error)
    };

}

const addMail = (req, res) => {
    const {title, author, text} = req.body;
    const mail = {
        id: new Date(),
        date: (new Date()).toLocaleDateString(),
        title,
        author,
        text,
    };
    if(mail.title == '' || mail.author == '' || mail.text == ''){
        const title = 'Error Page';
        res
            .status(404)
            .render(createPath('error'), {title});
    }
    else{
        try {
            (mails) => res.status(200).json(mails)
        } catch{
            (error) => handleError(res, error)
        }
    }
}


module.exports = {
    getMail,
    getMails,
    addMail,
};