const mongoose = require('mongoose');

let ProjectSchema = mongoose.Schema({
	projectName: { type: String, required: '{PATH} is required' },
	colour: { type: 'String' },
	createdDate: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;

function createDefaultProjects() {
	Project.find({}, function (err, collection) {
        if (err) return console.error('Error finding document');

    	// if (collection.length === 0) {
		// 	Project.create({name: 'Wedding' });
        //     Project.create({ name: 'Social' });
        //     Project.create({ name: 'Ideas' });
		// }
	});
};

module.exports.createDefaultProjects = createDefaultProjects;
