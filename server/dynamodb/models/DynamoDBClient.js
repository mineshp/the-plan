const AWS = require('aws-sdk');

const { awsConfig } = require('../../config/config');

AWS.config.update({
    region: awsConfig.region,
    endpoint: 'https://dynamodb.eu-west-1.amazonaws.com'
});

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

const DynamoDbApi = {
    query: (params, cb) => {
        dynamoDBClient.query(params, (err, data) => {
            if (err) {
                console.error('application', `dynamodb:query:err:${err.message}`);
                cb({ error: err.message });
            } else {
                cb(data);
            }
        });
    },

    get: (params, cb) => {
        dynamoDBClient.get(params, (err, data) => {
            if (err) {
                console.error('application', `dynamodb:get:err:${err.message}`);
                cb({ error: err.message });
            } else {
                cb(data);
            }
        });
    },

    put: (params, cb) => {
        dynamoDBClient.put(params, (err, data) => {
            if (err) {
                console.error('morpheus server', `dynamodb:put:err:${err.message}`);
                cb({ error: err.message });
            } else {
                cb(data);
            }
        });
    },

    update: (params, cb) => {
        dynamoDBClient.update(params, (err, data) => {
            if (err) {
                console.error('morpheus server', `dynamodb:update:err:${err.message}`);
                cb({ error: err.message });
            } else {
                cb(data);
            }
        });
    },

    scan: (params, cb) => {
        dynamoDBClient.scan(params, (err, data) => {
            if (err) {
                console.error('morpheus server', `dynamodb:scan:err:${err.message}`);
                cb({ error: err.message });
            } else {
                cb(data);
            }
        });
    },

    delete: (params, cb) => {
        dynamoDBClient.delete(params, (err, data) => {
            if (err) {
                console.log('in here bruv');
                console.error('morpheus server', `dynamodb:delete:err:${err.message}`);
                cb({ error: err.message });
            } else {
                cb(data);
            }
        });
    }
};

module.exports = DynamoDbApi;
