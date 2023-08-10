const fs = require('fs');
const path = require('path');

module.exports =  clearImage = (filePath) => {
    filePath = path.join(path.dirname(path.dirname(__filename)), filePath);
    fs.unlink(filePath, err => {
      if (err) {
        console.log('clearImage', err);
      }
    });
  }