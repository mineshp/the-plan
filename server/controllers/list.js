const List = require('mongoose').model('List');

exports.getAllLists = function(req,res) {
	List.find({}, function (err, collection) {
		res.send(collection);
	});
};

exports.getListById = function(req, res) {
    List.findOne({ _id: req.params.id }, function (err, collection) {
		res.send(collection);
	});
};

exports.createNewList = function(req, res) {
	List.find({ listName: req.body.listName }, function (err, collection) {
		if (collection.length === 0) {
			const newList = new List(req.body);
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

exports.updateList = function(req, res) {
	const data = req.body;
	List.update({ _id: req.params.id }, data, function (err, result) {
		if (err) {
			res.status(400);
			res.json(
				{
					message: `Error: List update failed for id ${req.params.id}.`
				}
			);
		}
		else {
			res.status(200);
			res.send(data);
		}
	});
};

exports.delete = function(req, res) {
	const id = req.params.id;
	List.findOne({ _id: id }, function (err, collection) {
		if (err) {
			res.status(400);
			res.json(
				{
					message: `Error: Unable to delete list with id ${id} not found with error ${err}.`
				}
			);
		} else {
			List.remove({ '_id': id }, function (err, result) {
				const data = Object.assign({}, result, {
					listName: collection.listName
				});
				return res.send(data);
			});
		}
	});
};

exports.deleteItem = function(req, res) {
	const listId = req.params.listId;
	const itemId = req.params.itemId;
	List.findOne({ _id: listId }, function (err, collection) {
		if (err) {
			res.status(400);
			res.json(
				{
					message: `Error: Unable to delete list item with item id ${itemId}, error ${err}.`
				}
			);
		}
		else {
			List.remove({ '_id': id }, function (err, result) {
				const data = Object.assign({}, result, {
					listName: collection.listName
				});
				return res.send(data);
			});
		}
	});
};
