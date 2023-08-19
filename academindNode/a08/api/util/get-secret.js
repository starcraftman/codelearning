const fs = require('fs')
const path = require('path');

const SECRET_PATH = path.join(path.dirname(path.dirname(path.dirname(__filename))), 'secrets')

const getSecret = (secret) => {
    return fs.readFileSync(
        path.join(SECRET_PATH, secret), 
        {
            encoding: 'utf-8'
        }
    );
};

module.exports = getSecret;