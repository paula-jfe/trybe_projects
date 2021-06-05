const { registerUser, getUser } = require('../models/register');

const verifyEmail = async (email) => {
  const getEmail = await getUser(email);
  const emailLength = 0;

  if (getEmail.length > emailLength) {
    throw new Error('Email já utilizado, tente cadastrar outro');
  }
};

const registerService = async (name, email, password, role) => {
  await verifyEmail(email);

  const register = await registerUser(name, email, password, role);

  return register;
};

module.exports = {
  registerService,
};