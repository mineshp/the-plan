const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./mongodb/models/User');

const app = express();
const env = process.env.NODE_ENV || 'development';
const dbType = process.env.DB_TYPE || 'mongodb';

const config = require('./config/config')[env];

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // req.body params are available

// app.use(passport.initialize());
// app.use(passport.session());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

require('./mongodb/models/List');

require('./mongodb/models/Project');

console.log(`Using database: ${dbType}`);
if (dbType === 'mongodb') {
    console.log(`DB: ${config.mongodb.db}`);
    // eslint-disable-next-line global-require
    require('./config/database').connect(config.mongodb);
}

require('./config/routes')(app);

// // passport config
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

module.exports = app;
