const { ObjectId } = require('mongodb');
const connection = require('../config/connection');

const registerRecipe = async (name, ingredients, preparation, userId) => connection().then((db) =>
    db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }))
    .then((result) => ({ name, ingredients, preparation, userId, _id: result.insertedId }));

const findAllRecipes = async () => connection().then((db) =>
  db.collection('recipes').find({}).toArray());

const findRecipeById = async (id) => connection().then((db) =>
    db.collection('recipes').findOne({ _id: ObjectId(id) }));

const updateFoundRecipe = async (id, name, ingredients, preparation) => connection().then((db) =>
    db.collection('recipes').updateOne({ _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } })
      .then(() => ({ _id: ObjectId(id), name, ingredients, preparation })));

const deleteFoundRecipe = async (id) => connection().then((db) =>
  db.collection('recipes').deleteOne({ _id: ObjectId(id) })
    .then(() => findRecipeById(id)));

const updateRecipeImage = async (id, image) => connection().then((db) =>
db.collection('recipes').updateOne({ _id: ObjectId(id) },
  { $set: { image } })
  .then(() => findRecipeById(id)));
  
module.exports = {
  registerRecipe,
  findAllRecipes,
  findRecipeById,
  updateFoundRecipe,
  deleteFoundRecipe,
  updateRecipeImage,
};
