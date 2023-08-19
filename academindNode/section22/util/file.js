const fs = require('fs');

const deleteFile = (filename) => {
    fs.unlink(filename, (err) => {
        if (err) {
            throw err;
        }
    })
}

exports.deleteFile = deleteFile;