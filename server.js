const app = require('./app');
const port = 3000;

app.listen(port, () => {
  console.log(`servidor em execução na porta ${port}`);
});
