const connect = require('../configuration/configuration');

const updateNameModel = async (name, email) => {
  const nameToUpdate = connect.execute(
    'UPDATE users SET name = ? WHERE email = ?',
    [name, email],
  );
  return nameToUpdate;
};

module.exports = {
  updateNameModel,
};