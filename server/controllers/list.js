const List = require('mongoose').model('List');

exports.getAllLists = function(req,res) {
    List.find({}, function (err, collection) {
		res.send(collection);
	});
};

exports.getListById = function (req, res) {
	console.log("ID IS ", req.params.id);
    List.findOne({ _id: req.params.id }, function (err, collection) {
			console.log("COLL FOR getListById", collection);
			res.send(collection);
	});
};
