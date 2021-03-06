const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    projectName: { type: String, required: '{PATH} is required' },
    projectDescription: { type: String, required: '{PATH} is required' },
    colour: { type: 'String' },
    profilesAssigned: [String],
    createdDate: { type: Date, default: Date.now },
    owner: { type: String }
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;

function createDefaultProjects() {
    Project.find({}, function (err, collection) {
        if (err) return console.error('Error finding document');
    });
}

module.exports.createDefaultProjects = createDefaultProjects;
