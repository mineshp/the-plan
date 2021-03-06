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
        port: process.env.PORT || 3030,
        jwtSecret: 'ilovecubanrum'
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
        port: process.env.PORT || 3030,
        jwtSecret: 'ilovecubanrum'
    },
    development: {
        rootPath,
        mongodb: {
            db: 'mongodb://localhost/theplandb'
        },
        dynamodb: {
            listsTable: 'lists-morpheus-dev',
            projectsTable: 'projects-morpheus-dev'
        },
        port: process.env.PORT || 3030,
        jwtSecret: 'ilovecubanrum' // TODO: Use complicated string
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
        port: process.env.PORT || 80,
        jwtSecret: 'iknowsomethingyoudontknow' // TODO: Use complicated string
    }
};
