// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const routes = require('./routes');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(routes);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Rodando na porta 3000');
});
