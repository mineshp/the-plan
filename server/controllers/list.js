const List = require('mongoose').model('List');

exports.getAllLists = function(req,res) {
    List.find({}, function (err, collection) {
		res.send(collection);
	});
};

exports.getListById = function(req,res) {
    List.findOne({ _id: req.params.id }, function (err, collection) {
        console.log("COLL", collection)
		res.send(collection);
	});
};
