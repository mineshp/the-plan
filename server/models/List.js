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

// exports.getAllLists = function (req, res) {
//     console.log("IN getAllLists, ", res);
//     res.status(200).json([{
//         id: 1,
//         name: "listA"
//     }, {
//         id: 2,
//         name: "listB"
//     }, {
//         id: 3,
//         name: "listC"
//     }]);

// };

// module.exports = {
//     getAllLists: function (req, res) {
//         console.log("IN getAllLists, ", res);

//         res.status(200).json([{
//             id: 1,
//             name: "listA"
//         }, {
//             id: 2,
//             name: "listB"
//         }, {
//             id: 3,
//             name: "listC"
//         }]);

//         // List.find({}, function (err, collection) {
//         //     if (err) {
//         //         console.log('ERR', err);
//         //         return res.status(500).json({ error: error });
//         //     }
//         //     console.log(collection);
//         //     //return res.status(200).json({ data: collection });

//         //     if (collection.length === 0) {
//         //         List.create({name: 'listA'});
//         //         List.create({ name: 'listB' });
//         //         List.create({ name: 'listC' });
//         //     }
// 	    // });
//     },

//     getListById: function (id) {
//         List.findOne({ id }, function (err, list) {
//             if (err) return console.error(`Unable to find list for id ${id}`);
//         });
//     }
// }




// function getListById(id) {
//     List.findOne({ id }, function (err, list) {
//         if (err) return console.error(`Unable to find list for id ${id}`);
//     });
// };
