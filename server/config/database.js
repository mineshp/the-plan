const mongoose = require('mongoose');
const listModel = require('../mongodb/models/List');
const projectModel = require('../mongodb/models/Project');

// https://github.com/guyellis/MEANAppsFiles/blob/master/server/config/mongoose.js

module.exports.connect = function (config) {
    mongoose.connect(config.db, {
        useMongoClient: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', () => {
        console.log(`Env: ${process.env.NODE_ENV} - Database connection establshed for ${config.db}`);
    });

    // listModel.createDefaultLists();
    projectModel.createDefaultProjects();
};

module.exports.clearTable = function () {
    db.projects.remove({});
};
