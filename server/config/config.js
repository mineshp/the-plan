const path = require('path');
const rootPath = path.normalize(__dirname + '/../');

module.exports = {
    awsConfig: {
        region: 'eu-west-1'
    },
    test: {
        rootPath,
        mongodb: {
            db: 'mongodb://localhost/theplandbtest'
        },
        dynamodb: {
            listsTable: 'lists-morpheus-dev',
            projectsTable: 'projects-morpheus-dev'
        },
        port: process.env.PORT || 3030
    },
    local: {
        rootPath,
        mongodb: {
            db: 'mongodb://localhost/theplandb'
        },
        dynamodb: {
            listsTable: 'lists-morpheus-dev',
            projectsTable: 'projects-morpheus-dev'
        },
        port: process.env.PORT || 3030
    },
    development: {
        rootPath,
        mongodb: {
            db: 'mongodb://localhost/theplandbtest'
        },
        dynamodb: {
            listsTable: 'lists-morpheus-dev',
            projectsTable: 'projects-morpheus-dev'
        },
        port: process.env.PORT || 3030
    },
    production: {
        rootPath,
        mongodb: {
            db: 'mongodb://localhost/theplandb'
        },
        dynamodb: {
            listsTable: 'lists-morpheus-prod',
            projectsTable: 'projects-morpheus-prod'
        },
        port: process.env.PORT || 80
    }
};
