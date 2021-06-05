const express = require('express');

const fs = require('fs').promises;

const token = require('../middlewares/tokenMiddleware');

const app = express();

const empty = [];

const notFound = {
  message: 'Crush não encontrado',
};

const getData = async () => {
  try {
    return JSON.parse(await fs.readFile(`${__dirname}/../crush.json`, 'utf8'));
  } catch (error) {
    throw new Error(error);
  }
};

const checkName = (name) => {
  if (!name) throw new Error('O campo "name" é obrigatório');
  else if (name.length < 3) throw new Error('O "name" deve ter pelo menos 3 caracteres');
};

const checkAge = (age) => {
  if (!age) throw new Error('O campo "age" é obrigatório');
  else if (age < 18) throw new Error('O crush deve ser maior de idade');
};

const checkDateFields = (datedAt, rate) => {
  if (!datedAt || rate === undefined) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  }
};

const checkDateFormat = (datedAt, rate) => {
  const regexForDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!regexForDate.test(datedAt)) {
    throw new Error('O campo "datedAt" deve ter o formato "dd/mm/aaaa"');
  }

  if (rate < 1 || rate > 5) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
};

const checkDate = (date) => {
  if (date === {} || date === undefined) {
    throw new Error('O campo "date" é obrigatório e "datedAt" e "rate" não podem ser vazios');
  } else {
    checkDateFields(date.datedAt, date.rate);
    checkDateFormat(date.datedAt, date.rate);
  }
};

const addCrush = async (name, age, date) => {
  const data = await getData();

  const newCrush = {
    id: data.length + 1,
    name,
    age,
    date,
  };
 
  data.push(newCrush);
  await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
  return newCrush;
};

const updateCrush = async (name, age, date, id) => {
  const data = await getData();
  const updatedCrush = {
    id: Number(id),
    name,
    age,
    date,
  };
  
  const crushId = data.findIndex((crush) => crush.id === Number(id));
  data[crushId] = updatedCrush;

  await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
  return updatedCrush;
};

const deleteCrush = async (id) => {
  const data = await getData();  
  data.filter((crush) => crush.id !== Number(id));

  await fs.writeFile(`${__dirname}/../crush.json`, JSON.stringify(data));
};

const checkSearchTerm = async (searchTerm) => {
  const data = await getData();
  if (!searchTerm) return data;
  const crushesFound = data.filter((crush) => crush.name.includes(searchTerm));
  if (crushesFound) return crushesFound;
  return [];
};

app.get('/', async (_request, response) => {
  const data = await getData();
  if (data.length === 0) return response.status(200).send(empty);
  return response.status(200).send(await getData());
});

app.get('/search', token, async (request, response) => {
  const { q } = request.query;
  const findData = await checkSearchTerm(q);
  response.status(200).send(findData);
});

app.get('/:id', async (request, response) => {
  const { id } = request.params;
  const data = await getData();
  const crushFound = data.find((crush) => crush.id === Number(id));
  if (!crushFound) return response.status(404).send(notFound);
  return response.status(200).send(crushFound);
});

app.use(token);

app.post('/', async (request, response) => {
  const { name, age, date } = request.body;
  try {
    checkName(name);
    checkAge(age);
    checkDate(date);
  } catch (error) {
    return response.status(400).send({
      message: error.message,
    });
  }

  const newCrush = await addCrush(name, age, date);
  response.status(201).send(newCrush);
});

app.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, age, date } = request.body;
  
  try {
    checkName(name);
    checkAge(age);
    checkDate(date);
  } catch (error) {
    return response.status(400).send({
      message: error.message,
    });
  }

  const updatedCrush = await updateCrush(name, age, date, id);
  response.status(200).send(updatedCrush);
});

app.delete('/:id', async (request, response) => {
  const { id } = request.params;

  await deleteCrush(id);
  response.status(200).send({ message: 'Crush deletado com sucesso' });
});

module.exports = app;
