const mongoose = require('mongoose');

let listSchema = mongoose.Schema({
	name: {type: String, required: '{PATH} is required'},
});

const List = mongoose.model('List', listSchema);

function createDefaultLists() {
	List.find({}, function (err, collection) {
        if (err) return console.error('Error finding document');

    	if (collection.length === 0) {
			List.create({name: 'listA'});
            List.create({ name: 'listB' });
            List.create({ name: 'listC' });
		}
	});
};

exports.createDefaultLists = createDefaultLists;
