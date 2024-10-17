const express = require('express');
const path = require('path');
const urlRoute = require('./route/url.router')
const redirectRoute = require('./route/redirect-router')
const staticRoute = require('./route/static-router')
const URL = require('./model/url-model')
const { connectToMongoDB } = require('./connection')
const app = express();
const PORT = 8080;

connectToMongoDB('mongodb://127.0.0.1:27017/shortUrl')
    .then(() => console.log('mongoDb connected'))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.resolve("./view"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', staticRoute)
app.use('/url', urlRoute);
app.use('/url', redirectRoute);
app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));