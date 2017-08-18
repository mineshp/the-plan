const express = require('express');
const app = express();

const bodyParser= require('body-parser')
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

app.use(bodyParser.json()); // req.body params are available
app.use(bodyParser.urlencoded({ extended: true }));

require('./config/database')(config);
require('./config/routes')(app);

app.listen(config.port, function () {
  console.log(`Express backend api running on port: ${config.port}!`)
})
