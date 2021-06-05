const express = require('express');
const { getUserProfile, updateNameController } = require('../controllers/profile');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.route('/profile')
  .get(validateToken, getUserProfile)
  .patch(validateToken, updateNameController);

module.exports = router;