const Profile = require('mongoose').model('Profile');

exports.getAllProfiles = (req, res) => {
	Profile.find(
		{},
		null,
		{ sort: { active: 1, updatedDate: -1 } },
		function (err, collection) {
		    res.send(collection);
        }
    );
};

exports.deleteProfile = (req, res) => {
    const id = req.params.id;
    Profile.findOne({ _id: id }, (err) => {
        if (err) {
            res.status(400);
            res.json(
                {
                    message: `Error: Unable to delete profile with id ${id} not found with error ${err}.`
                }
            );
        } else {
            Profile.remove({ _id: id }, (userErr, result) => res.send(result));
        }
    });
};

exports.createNewProfile = function (req, res) {
    Profile.find({ name: req.body.name }, function (err, collection) {
		if (collection.length === 0) {
			const newProfile = new Profile(req.body);
			newProfile.save((err, result) => {
				if (err) {
					return res.send(`Error saving new profile, ${err}`);
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
					message: 'Error: Profile with the same name already exists, please choose another name.'
				}
			);
		}
	});
};

exports.updateProfile = function (req, res) {
	const data = req.body;
	Profile.update({ _id: req.params.id }, data, function (err, result) {
		if (err) {
			res.status(400);
			res.json(
				{
					message: `Error: Profile update failed for id ${req.params.id}.`
				}
			);
		}
		else {
			res.status(200);
			res.send(data);
		}
	});
};
