const Project = require('mongoose').model('Project');

exports.getAllProjectsBySelectedProfiles = function (req, res) {
	Project.find({ profilesAssigned: { $in: req.body.profiles } }, function (err, collection) {
		res.send(collection);
	});
};

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
					return res.send(`Error saving new project, ${err}`);
				}
				else {
					res.status(201);
					res.send(result);
				}
			});
		}
		else {
			res.status(400);
			res.json(
				{
					message: 'Error: Project with the same name already exists, please choose another name.'
				}
			);
		}
	});
};

exports.updateProject = function (req, res) {
	const data = req.body;
	Project.update({ _id: req.params.id }, data, function (err, result) {
		if (err) {
			res.status(400);
			res.json(
				{
					message: `Error: Project update failed for id ${req.params.id}.`
				}
			);
		}
		else {
			res.status(200);
			res.send(data);
		}
	});
};

exports.delete = function (req, res) {
	const id = req.params.id;
	Project.findOne({ _id: id }, function (err, collection) {
		if (err) {
			res.status(400);
			res.json(
				{
					message: `Error: Unable to delete project with id ${id} not found with error ${err}.`
				}
			);
		}
		else {
			Project.remove({ '_id': id }, function (err, result) {
				const data = Object.assign({}, result, {
					projectName: collection.projectName
				});
				return res.send(data);
			});
		}
	});
};