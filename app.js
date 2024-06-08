const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const animaisRoutes = require('./routes/animaisRoutes');
const adocaoRoutes = require('./routes/adocaoRoutes');

const app = express();

app.use(bodyParser.json());

app.use(userRoutes);
app.use(animaisRoutes);
app.use(adocaoRoutes);

module.exports = app;
