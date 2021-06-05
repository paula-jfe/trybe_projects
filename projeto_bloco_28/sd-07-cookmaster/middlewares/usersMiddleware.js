const { BAD_REQUEST, CONFLICT, UNAUTHORIZED, FORBIDDEN } = require('../http');

const usersModel = require('../models/usersModel');

const checkEmailIsValid = (email) => {
  const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regexEmail.test(email);
};

const checkIfEmailOrPasswordIsPresent = (email, password) => (!((!email || !password)));

const checkUserRequiredFields = (request, response, next) => {
  const { name, email, password } = request.body;
  
  const checkEmail = checkEmailIsValid(email);
  const isPresent = checkIfEmailOrPasswordIsPresent(email, password);
  if (!name || !isPresent || !checkEmail) {
    return response.status(BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const checkIfExists = async (request, response, next) => {
  const { email } = request.body;

  const results = await usersModel.findUserByEmailAddress(email);
  if (results) {
    return response.status(CONFLICT).json({
      message: 'Email already registered',
    });
  }

  next();
};

const checkLoginRequiredFields = (request, response, next) => {
  const { email, password } = request.body;

  const isPresent = checkIfEmailOrPasswordIsPresent(email, password);
  if (isPresent === false) {
    return response.status(UNAUTHORIZED).json({
      message: 'All fields must be filled',
    });
  }

  next();
};

const checkIfAdmin = (request, response, next) => {
  const { role } = request.user;
  if (role !== 'admin') {
    return response.status(FORBIDDEN).json({
      message: 'Only admins can register new admins',
    });
  }
  next();
};

module.exports = {
  checkUserRequiredFields,
  checkIfExists,
  checkLoginRequiredFields,
  checkIfAdmin,
};
