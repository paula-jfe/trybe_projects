const express = require('express');
const { registerUser } = require('../controllers/register');

const router = express.Router();

router.route('/register')
  .post(registerUser);

module.exports = router;