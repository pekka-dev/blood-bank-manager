const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
const port = process.env.PORT;

require(require('path').join(__dirname, 'routes', 'index'))(app);

app.listen(port, function () {
    console.log('> Server is running on => http://localhost:' + port);
});

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));