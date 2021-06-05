const tokenMiddleware = (request, response, next) => {
  const { authorization: token } = request.headers;

  if (!token) {
    return response.status(401).send({
        message: 'Token não encontrado',
    });
  } if (token.length < 16) {
    return response.status(401).send({
      message: 'Token inválido',
    });
  }
  next();
};

module.exports = tokenMiddleware;
