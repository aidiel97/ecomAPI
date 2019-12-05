const fs = require('fs');

module.exports = {
  encode: (file) => {
    const img = fs.readFileSync(file.path);
    const encodeImage = img.toString('base64');

    const imageFile = {
      contentType: file.mimetype,
      image: Buffer.from(encodeImage, 'base64'),
    };

    return imageFile;
  },
};
