const User = require('mongoose').model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = function (req, res) {
    if (
        req.body.email &&
        req.body.username &&
        req.body.password
    ) {
        const userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        };

        const newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) {
                return res.send(`Error registering new user ${userData.username}, ${err}`);
            } else {
                // return res.redirect('/profile');
                res.status(201);
                res.send(user);
            }
        });
    }
};

exports.login = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username }, function (err, collection) {
        if (err) {
            console.log('err finding username', err)
            res.status(400);
            res.json(
                {
                    message: `Error: Unable to search for username ${username}, error ${err}.`
                }
            );
        } else if (!collection) {
            console.log('collection is undefined ', collection);
            // res.status(400);
            res.status(404).json(
                {
                    message: `Unable to login with username ${username}, no such user found.`
                }
            );
        } else {
            console.log('collection found ', collection);
            bcrypt.compare(password, collection.password, function (err, result) {
                console.log('err', err);
                console.log('result', result);
                if (result === true) {
                    const payload = {
                        username: collection.username,
                        email: collection.email
                    };
                    // console.log('payload', payload);
                    // const token = jwt.sign(payload, app.get('superSecret'), {
                    //     expiresInMinutes: 1440 // expires in 24 hours
                    // });
                    // res.send(token);
                    res.send(collection);
                } else {
                    res.status(400);
                    res.json(
                        {
                            message: `Unable to login, username or password provided is incorrect.`
                        }
                    );
                }
            });
        }
    });
}
