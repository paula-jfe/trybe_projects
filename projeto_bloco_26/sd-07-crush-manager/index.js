const express = require('express');
const crush = require('./routes/crush');
const login = require('./routes/login');
const search = require('./routes/search');

const app = express();
app.use(express.json());

const SUCCESS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use('/login', login);
app.use('/crush', crush);

app.listen(PORT, () => { console.log('Online'); });
