const connection = require('../config/connection');

const registerUser = async (name, email, password, role = 'user') => connection().then((db) =>
  db.collection('users')
    .insertOne({ name, email, password, role }))
  .then((result) => ({ name, email, role, _id: result.insertedId }));

const findUserByEmailAddress = async (email) => connection().then((db) =>
    db.collection('users').findOne({ email }));

module.exports = {
  registerUser,
  findUserByEmailAddress,
};
