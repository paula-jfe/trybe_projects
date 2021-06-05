const express = require('express');
const path = require('path');

const editId = '/recipes/:id';

const imagesController = require('../controllers/imagesController');
const usersController = require('../controllers/usersController');
const recipesController = require('../controllers/recipesController');

const { upload } = require('../middlewares/imagesMiddleware');
const { validateToken } = require('../middlewares/validateTokenMiddleware');
const { checkRecipeRequiredFields, 
  checkRecipeIsFromUserOrAdmin } = require('../middlewares/recipesMiddleware');
const { checkUserRequiredFields, checkIfExists,
  checkLoginRequiredFields, 
  checkIfAdmin } = require('../middlewares/usersMiddleware');

const recipesMiddlewares = [checkRecipeRequiredFields, validateToken];
const usersMiddlewares = [checkUserRequiredFields, checkIfExists];
const recipesEditMiddlewares = [validateToken, checkRecipeIsFromUserOrAdmin];
const recipesDeleteMiddlewares = [validateToken, checkRecipeIsFromUserOrAdmin];
const recipesImageMiddlewares = [validateToken, upload];
const adminMiddlewares = [validateToken, checkIfAdmin];

const router = express.Router();

router.post('/users', usersMiddlewares, usersController.createUser);
router.post('/login', checkLoginRequiredFields, usersController.signIn);
router.post('/recipes', recipesMiddlewares, recipesController.createRecipe);
router.get('/recipes', recipesController.getRecipes);
router.get(editId, recipesController.getRecipeById);
router.put(editId, recipesEditMiddlewares, recipesController.updateRecipe);
router.delete(editId, recipesDeleteMiddlewares, recipesController.deleteRecipe);
router.put('/recipes/:id/image', recipesImageMiddlewares, imagesController.sendImage);
// dirname vai até o arquivo em que está declarado.
router.use('/images', express.static(path.join(__dirname, '../uploads')));
router.post('/users/admin', adminMiddlewares, usersController.createAdminUser);

module.exports = router;
