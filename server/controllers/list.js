const List = require('mongoose').model('List');

exports.getAllLists = function(req,res) {
	List.find({}, function (err, collection) {
		res.send(collection);
	});
};

exports.getListById = function (req, res) {
    List.findOne({ _id: req.params.id }, function (err, collection) {
		res.send(collection);
	});
};

exports.createNewList = function (req, res) {
	List.find({ listName: req.body.listName }, function (err, collection) {
		if (collection.length === 0) {
			console.log("BODY ", req.body);
			const newList = new List(req.body);
			console.log("NEWLIST", newList);
			newList.save((err, result) => {
				if (err) {
					return res.send(`Error saving new list, ${err}`);
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
					message: 'Error: List with the same name already exists, please choose another name.'
				}
			);
		}
	});
};