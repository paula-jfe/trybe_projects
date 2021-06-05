const express = require('express');

const crypto = require('crypto');

const app = express();

const getToken = () => crypto.randomBytes(8).toString('hex');

const authenticateEmail = (email) => {
  const regexForEmail = /^\S+@\S+\.\S+$/;
  if (!email) {
    throw new Error('O campo "email" é obrigatório');
  } else if (!regexForEmail.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
};

const authenticatePassword = (password) => {
  if (!password) {
    throw new Error('O campo "password" é obrigatório');
  } else if (String(password).length < 6) {
    throw new Error('A "senha" deve ter pelo menos 6 caracteres');
  }
};

app.post('/', (request, response) => {
  const { email, password } = request.body;
  try {
    authenticateEmail(email);
    authenticatePassword(password);
    const generatedToken = {
      token: getToken(),
    };
    return response.status(200).send(generatedToken);
  } catch (error) {
    return response.status(400).send({
      message: error.message,
    });
  }
});

module.exports = app;
