let mongoose = require('mongoose');
const listModel = require('../models/List');
const projectModel = require('../models/Project');

// https://github.com/guyellis/MEANAppsFiles/blob/master/server/config/mongoose.js

module.exports = function(config) {
    mongoose.connect(config.db, {
        useMongoClient: true
    });
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    listModel.createDefaultLists();
    projectModel.createDefaultProjects();
};