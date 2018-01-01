const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const env = process.env.NODE_ENV || 'development';
const dbType = process.env.DB_TYPE || 'mongodb';

const config = require('./config/config')[env];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // req.body params are available

require('./mongodb/models/List');

require('./mongodb/models/Project');

console.log(`Using database: ${dbType}`);
if (dbType === 'mongodb') {
    console.log(`DB: ${config.mongodb.db}`);
    // eslint-disable-next-line global-require
    require('./config/database').connect(config.mongodb);
}

require('./config/routes')(app);

module.exports = app;
