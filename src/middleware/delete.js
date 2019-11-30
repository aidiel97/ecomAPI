const fs = require('fs');

module.exports = {
  deleteFile: (oldImageUrl) => {
    fs.unlink(oldImageUrl, (err) => {
      if (err) {
        console.error(err);
      }
    });
  },
};
