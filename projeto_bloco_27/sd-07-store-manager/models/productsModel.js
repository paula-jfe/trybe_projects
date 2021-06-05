const { ObjectId } = require('mongodb');
const conn = require('../config/conn');

const addNewProduct = async (name, quantity) => {
  return await conn().then((db) =>
    db.collection('products')
      .insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }));
};

const findProduct = async (name) => {
  return await conn().then((db) =>
    db.collection('products').findOne({ name }));
};

const findAllProducts = async () => {
  return await conn().then((db) =>
    db.collection('products').find({}).toArray());
};

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error;
  return await conn().then((db) =>
    db.collection('products').findOne({ _id: ObjectId(id) }));
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) throw new Error;
  return await conn().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) },
      { $set: { name, quantity } })
      .then(() => ({ _id: ObjectId(id), name, quantity })));
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error;
  return await conn().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }))
    .then(() => findProductById(id));
};

module.exports = {
  addNewProduct,
  findProduct,
  findAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
