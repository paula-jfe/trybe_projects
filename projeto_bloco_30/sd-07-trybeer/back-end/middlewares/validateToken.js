const jwt = require('jsonwebtoken');
const login = require('../models/login');
const httpStatus = require('../controllers/httpStatus');
const secret = require('../controllers/login');

const noTokenMessage = { message: 'Token não encontrado ou informado' };
const userNotFound = { message: 'Erro ao procurar usuário do token.' };

const validateToken = async (req, res, next) => { 
  const token = req.headers.authorization;
  if (!token) return res.status(httpStatus.UNAUTHORIZED).json(noTokenMessage);
  try {
    const decoded = jwt.verify(token, secret.secret);
    const user = await login.loginModel(decoded.email);
  if (!user) return res.status(httpStatus.UNAUTHORIZED).json(userNotFound);
      req.user = user;
      next();    
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
  }
};

module.exports = validateToken;