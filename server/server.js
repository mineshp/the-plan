const app = require('./app');
const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

app.listen(config.port, () => {
  console.log(`Express backend api running on port: ${config.port}!`)
});
