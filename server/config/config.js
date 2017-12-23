const path = require('path');
const rootPath = path.normalize(__dirname + '/../');

module.exports = {
    test: {
        rootPath: rootPath,
        db: 'mongodb://localhost/theplandbtest',
        port: process.env.PORT || 3031
    },
    development: {
        rootPath: rootPath,
        db: process.env.MONGODB_ENDPOINT || 'mongodb://localhost/theplandb',
        port: process.env.PORT || 3031
    },
    production: {
        rootPath: rootPath,
        db: process.env.MONGODB_ENDPOINT,
        port: process.env.PORT || 3031
    }
};
