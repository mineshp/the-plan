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
    app.post('/project/create', project.createNewProject);

	// app.all('/api/*', function(req,res) {
	// 	res.send(404);
	// });

	// app.get('*', function (req, res) {
	// 	res.render('index', {
	// 		bootstrappedUser: req.user
	// 	});
	// });
};