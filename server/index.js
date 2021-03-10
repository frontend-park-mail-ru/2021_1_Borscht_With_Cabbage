'use strict';

const express = require('express');
const body = require('body-parser');
const path = require('path');
const cookie = require('cookie-parser');

const app = express();
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

app.all('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
