const express = require('express');
const morgan = require('morgan');
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
