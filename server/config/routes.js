const list = require('../controllers/list');
const project = require('../controllers/project');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('Welcome to the backend')
    });

    app.get('/list/all', list.getAllLists);
	app.get('/list/view/:id', list.getListById);
	app.post('/list/update/:id', list.updateList);
	app.post('/list/update', list.createNewList);
	app.delete('/list/delete/:id', list.delete);

	app.get('/project/all', project.getAllProjects);
	app.post('/project/update/:id', project.updateProject);
	app.post('/project/update', project.createNewProject);
	app.delete('/project/delete/:id', project.delete);
	app.get('/project/:id', project.getProjectById);

	// app.all('/api/*', function(req,res) {
	// 	res.send(404);
	// });

	// app.get('*', function (req, res) {
	// 	res.render('index', {
	// 		bootstrappedUser: req.user
	// 	});
	// });
};