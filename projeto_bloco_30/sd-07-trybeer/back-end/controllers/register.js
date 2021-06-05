const jwt = require('jsonwebtoken');
const { registerService } = require('../services/register');
const httpStatus = require('./httpStatus');

const secret = 'meusegredoparajwt';

const registerUser = async (req, res) => {
  try {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const { name, email, password, role } = req.body;
    const token = jwt.sign({ data: name, email, role }, secret, jwtConfig);
    const register = await registerService(name, email, password, role);
    console.log(register);
    res.status(httpStatus.CREATED).json({ name, email, role, token });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
};