const { updateProfileService } = require('../services/profile');
const httpStatus = require('./httpStatus');

const getUserProfile = async (req, res) => {
  try {
    const { user } = req;
    // console.log(user);
    const userData = { name: user.name, email: user.email };
    res.status(httpStatus.OK).json(userData);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const updateNameController = async (req, res) => {
  try {
    const { user } = req;
    const { name } = req.body;
    const userToUpdate = await updateProfileService(name, user.email);
    console.log(userToUpdate);
    res.status(httpStatus.OK).json({ message: 'Atualização concluída com sucesso' });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUserProfile,
  updateNameController,
};