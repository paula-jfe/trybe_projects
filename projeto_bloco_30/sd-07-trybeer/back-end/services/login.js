const { loginModel,
  // getUser,
} = require('../models/login');

const loginService = async (email, password) => {
  // const verifyingUser = await getUser(email);
  // if (verifyingUser) {
  //   throw new Error('email já utilizado');
  // }

  const login = await loginModel(email, password);
  return login;
};

module.exports = {
  loginService,
};