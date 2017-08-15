const express = require('express');
const app = express();

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

require('./config/database')(config);
require('./config/routes')(app);

app.listen(config.port, function () {
  console.log(`Express backend api running on port: ${config.port}!`)
})
