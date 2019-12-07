const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, ''); // remove space
    cb(null, `${Date.now()}-${cleanName}`);
  },
});

const Upload = multer({ storage });

module.exports = Upload.single('image');
