const mongoose = require('mongoose');

let ListSchema = mongoose.Schema({
	listName: { type: String, required: '{PATH} is required' },
	createdDate: { type: Date, default: Date.now },
	updatedDate: { type: Date, default: Date.now },
	projects: [{
        name: String,
        id: { type: String }
	}],
	headings: [{
		name: String,
		id: String,
		position: Number
	}],
	items: [{
	}]
});

const List = mongoose.model('List', ListSchema);
module.exports = List;

// function createDefaultLists() {
// 	List.find({}, function (err, collection) {
//         if (err) return console.error('Error finding document');

//     	if (collection.length === 0) {
// 			List.create({name: 'listA'});
//             List.create({ name: 'listB' });
//             List.create({ name: 'listC' });
// 		}
// 	});
// };

// exports.createDefaultLists = createDefaultLists;
