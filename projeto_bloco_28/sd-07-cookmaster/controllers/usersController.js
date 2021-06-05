const jwt = require('jsonwebtoken');
/* const bcrypt = require('bcrypt-nodejs'); */
const { REQUEST_CREATED, REQUEST_OK,
  INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require('../http');
const usersModel = require('../models/usersModel');

const secret = 'trybe';

const createUser = async (request, response) => {
  try {
    const { name, email, password, role } = request.body;
    /* const salt = bcrypt.genSaltSync(5);
    const encryptedPassword = bcrypt.hashSync(password, salt); */
    const results = await usersModel.registerUser(name, email, password, role);
    return response.status(REQUEST_CREATED).json({ user: results });
  } catch (error) {
    return response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const signIn = async (request, response) => {
  try {
    const { email, password } = request.body;
    const results = await usersModel.findUserByEmailAddress(email);
    if (!results) throw new Error('Incorrect username or password');

    /* const isMatch = bcrypt.compareSync(password, results.password); */
    if (password !== results.password) throw new Error('Incorrect username or password');

    const jwtConfig = { expiresIn: 5 * 60 * 60, algorithm: 'HS256' };
    const token = jwt.sign({ data: results.email }, secret, jwtConfig);
    return response.status(REQUEST_OK).json({ token });
  } catch (error) {
    return response.status(UNAUTHORIZED).json({ message: error.message });
  }
};

const createAdminUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const role = 'admin';
    const results = await usersModel.registerUser(name, email, password, role);
    return response.status(REQUEST_CREATED).json({ user: results });
  } catch (error) {
    return response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  signIn,
  createAdminUser,
};
