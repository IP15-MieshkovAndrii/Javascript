const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const superagent = require('superagent')
const transporter = require('./mail');
const mailRoutes = require('./routes/mail-routes')
const rateRoutes = require('./routes/rate-routes')
const mailApiRoutes = require('./routes/api-mail-routes')
const rateApiRoutes = require('./routes/api-rate-routes')
const createPath = require('./helpers/create-path')

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({extended: false}));
app.use(express.static('styles'));


app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title});
});
app.post('/', (req, res) => {
    const AdminPass = '12345';
    const pass = req.body.password;
    const path = 'base.json';

    if(pass == AdminPass){
        superagent
            .get('https://api.exchangerate.host/latest?base=BTC&symbols=UAH')
            .end((err, result) => {
                if(err){
                    const title = 'Error'
                    result
                        .status(404)
                        .render(createPath('error'), {title});
                } else{
                    let maillist = [];
                    const mails = JSON.parse(fs.readFileSync(path));
                    for(let i=0; i < mails.length; i++){
                        maillist.push(mails.email);
                    }
                    const data = JSON.parse(result.text);
                    const to = 'UAH';
                    const rate = data.rates[to]; 
                    const mailOptions = {
                        from: process.env.EMAIL_HOST,
                        to: maillist,
                        subject: 'Поточний курс',
                        text: `${rate} грн.`
                    }
                    transporter.sendMail(mailOptions, (err, info) => {
                        if(err){
                            console.log(err);
                            return;
                        }
                        console.log(info.response);
                    })
                    setTimeout(() => {transporter.close()}, 1500);
                }});
    }
    else{
        const title = 'Home';
        res.render(createPath('index'), {title});
        
    }
})


app.use(mailRoutes);
app.use(rateRoutes);
app.use(mailApiRoutes);
app.use(rateApiRoutes);

app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), {title});
});
