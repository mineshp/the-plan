const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // req.body params are available

const ProjectModel = require('./models/Project');

require('./config/database').connect(config);
require('./config/routes')(app);

module.exports = app;