const { updateNameModel } = require('../models/profile');

const updateProfileService = async (name, email) => {
  const toUpdate = await updateNameModel(name, email);

  return toUpdate;
};

module.exports = {
  updateProfileService,
};