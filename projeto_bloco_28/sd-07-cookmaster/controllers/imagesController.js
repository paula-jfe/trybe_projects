const recipesModel = require('../models/recipesModel');

/* Http vem pra controller, relacionado às rotas */

const sendImage = async (request, response) => {
  const { id } = request.params;
  const { filename } = request.file;
  const imageURL = `localhost:3000/images/${filename}`;

  try {
    const results = await recipesModel.updateRecipeImage(id, imageURL);
    return response.status(200).json(results);
  } catch (error) {
    return response.status(500).json({
      message: 'Erro ao enviar as imagens',
      error: error.message,
    });
  }
};

module.exports = {
  sendImage,
};
