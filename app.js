const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./src/routes/userRoutes');
const animaisRoutes = require('./src/routes/animaisRoutes');
const adocaoRoutes = require('./src/routes/adocaoRoutes');

const { sequelize } = require('./src/Models');

const app = express();

app.use(bodyParser.json());

app.use(userRoutes);
app.use(animaisRoutes);
app.use(adocaoRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
});

module.exports = app;
