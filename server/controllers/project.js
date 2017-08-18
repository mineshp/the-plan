const Project = require('mongoose').model('Project');

exports.getAllProjects = function(req,res) {
    Project.find({}, function (err, collection) {
		res.send(collection);
	});
};

exports.getProjectById = function(req,res) {
    Project.findOne({ _id: req.params.id }, function (err, collection) {
		res.send(collection);
	});
};

exports.createNewProject = function (req, res) {
	Project.find({ projectName: req.body.projectName }, function (err, collection) {
		if (collection.length === 0) {
			const newProject = new Project(req.body);

			newProject.save((err, result) => {
				if (err) {
					console.log(err);
					return res.send(`Error saving new project, ${err}`);
				}
				else {
					res.send('Successfully saved new record');
				}
			});
		}
		else {
			res.send(new Error(
				'Project with the same name already exists, please choose another name.'
			));
		}
	});
};