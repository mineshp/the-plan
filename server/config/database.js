const mongoose = require('mongoose');
const projectModel = require('../models/Project');

// https://github.com/guyellis/MEANAppsFiles/blob/master/server/config/mongoose.js

module.exports.connect = function(config) {
    mongoose.connect(config.db, {
        useMongoClient: true
    });
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log(`Database connection establshed for ${config.db}`);
    });

    projectModel.createDefaultProjects();
};

module.exports.clearTable = function () {
    db.projects.remove({});
}