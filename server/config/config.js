const path = require('path');
const rootPath = path.normalize(__dirname + '/../');

module.exports = {
    test: {
        rootPath: rootPath,
        db: 'mongodb://localhost/theplandbtest',
        port: process.env.PORT || 3030
    },
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/theplandb',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: process.env.MONGO_LAB,
        port: process.env.PORT || 80
    }
};
