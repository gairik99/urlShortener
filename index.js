const express = require('express');
const path = require('path');
const { connectToMongoDB } = require('./connection')
const cookieParser = require('cookie-parser')
const { restrictToLoggedInUser, checkAuth } = require('./middleware/auth-middleware')
const urlRoute = require('./route/url.router')
const redirectRoute = require('./route/redirect-router')
const staticRoute = require('./route/static-router')
const userRoute = require('./route/auth-router')
const app = express();
const PORT = 8080;

connectToMongoDB('mongodb://127.0.0.1:27017/shortUrl')
    .then(() => console.log('mongoDb connected'))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.resolve("./view"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', checkAuth, staticRoute);
app.use('/user', userRoute);
app.use('/url', restrictToLoggedInUser, urlRoute);
app.use('/url', redirectRoute);
app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));