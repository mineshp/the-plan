const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    name: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
