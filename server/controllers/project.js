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
