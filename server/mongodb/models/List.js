const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    listName: { type: String, required: '{PATH} is required' },
    owner: { type: String },
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
    items: [{}]
});

const List = mongoose.model('List', ListSchema);
module.exports = List;
