const { BAD_REQUEST } = require('../http');

const recipesModel = require('../models/recipesModel');

const checkRecipeRequiredFields = (request, response, next) => {
  const { name, preparation, ingredients } = request.body;
  
  if (!name || !preparation || !ingredients) {
    return response.status(BAD_REQUEST).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const checkRecipeIsFromUserOrAdmin = async (request, response, next) => {
  const { id } = request.params;
  const { _id: userId, role } = request.user;
  const results = await recipesModel.findRecipeById(id);

  if (role === 'user' && results.userId.toString() !== userId.toString()) {
    return response.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = {
  checkRecipeRequiredFields,
  checkRecipeIsFromUserOrAdmin,
};
