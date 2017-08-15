const mongoose = require('mongoose');
const list = require('../controllers/list');
const project = require('../controllers/project');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('Welcome to the backend')
    });

    app.get('/list/all', list.getAllLists);
    app.get('/list/:id/view', list.getListById);

    app.get('/project/all', project.getAllProjects);

    // app.get('/list/all', function (req, res) {
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
    // });

    //app.get('/list/:id', List.getListById);

    // app.get('/list/list1', function (req, res) {
    //     res.json([{
    //         id: 1,
    //         name: "Bread"
    //     }, {
    //         id: 2,
    //         name: "Eggs"
    //     }, {
    //         id: 3,
    //         name: "Milk"
    //     }]);
    // });



    // app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	// app.post('/api/users', users.createUser);
	// app.put('/api/users', users.updateUser);

	// app.get('/api/courses', courses.getCourses);
	// app.get('/api/courses/:id', courses.getCoursesById);

	// app.get('/partials/*', function (req, res) {
	// 	res.render('../../public/app/' + req.params);
	// });

	// app.post('/login', auth.authenticate);

	// app.post('/logout', function(req,res){
	// 	req.logout(); // method was added to req by passport module
	// 	res.end();
	// });

	// app.all('/api/*', function(req,res) {
	// 	res.send(404);
	// });

	// app.get('*', function (req, res) {
	// 	res.render('index', {
	// 		bootstrappedUser: req.user
	// 	});
	// });
};