const { ObjectId } = require('mongodb');
const conn = require('../config/conn');

const addNewSale = async (sale) => {
  return await conn().then((db) =>
    db.collection('sales')
      .insertOne({ itensSold: sale })
      .then((result) => ({ _id: result.insertedId,
        itensSold: sale })));
};

const findSale = async (name) => {
  return await conn().then((db) =>
    db.collection('sales').findOne({ name }));
};

const findAllSales = async () => {
  return await conn().then((db) =>
    db.collection('sales').find({}).toArray());
};

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await conn().then((db) =>
    db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const updateSale = async (id, sale) => {
  if (!ObjectId.isValid(id)) throw new Error;
  return await conn().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) },
      { $set: { itensSold: sale } })
      .then(() => ({
        _id: id,
        itensSold: sale })));
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error;
  return await conn().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }))
    .then(() => findSaleById(id));
};

module.exports = {
  addNewSale,
  findSale,
  findAllSales,
  findSaleById,
  updateSale,
  deleteSale,
};
