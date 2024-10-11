const express = require('express');
const urlRoute = require('./route/url.router')
const redirectRoute = require('./route/redirect-router')
const URL = require('./model/url-model')
const { connectToMongoDB } = require('./connection')
const app = express();
const PORT = 8080;

connectToMongoDB('mongodb://127.0.0.1:27017/shortUrl')
    .then(() => console.log('mongoDb connected'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use('/url', urlRoute);
app.use('/', redirectRoute);
app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));