const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_request, _file, callback) => {
    callback(null, 'uploads');
  },
  filename: (request, _file, callback) => {
    const { id } = request.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage }).single('image');

module.exports = {
  upload,
};
