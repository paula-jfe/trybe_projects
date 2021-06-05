const connect = require('../configuration/configuration');

const registerUser = async (name, email, password, role = 'client') => {
  const [register] = await connect.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role],
  );

  return register;
};

const getUser = async (email) => {
  const [userEmail] = await connect.execute(
    'SELECT * FROM users WHERE email = ?',
    [email],
  );
  
  return userEmail;
};

module.exports = {
  registerUser,
  getUser,
};