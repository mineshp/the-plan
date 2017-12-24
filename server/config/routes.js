const listMongodb = require('../mongodb/controllers/list');
const projectMongodb = require('../mongodb/controllers/project');
const listDynamodb = require('../dynamodb/controllers/list');
const projectDynamodb = require('../dynamodb/controllers/project');

const dbType = process.env.DB_TYPE || 'mongodb';
let list;
let project;
if (dbType === 'mongodb') {
    list = listMongodb;
    project = projectMongodb;
} else {
    list = listDynamodb;
    project = projectDynamodb;
}


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('Welcome to the backend')
    });

	app.get('/list/all', list.getAllLists);
	app.get('/list/view/:id', list.getListById);
	app.post('/list/update/:id', list.updateList);
	app.post('/list/update', list.createNewList);
	app.delete('/list/delete/:id', list.delete);
	app.get('/list/generate/pdf/:id', list.generatePDF);

	app.get('/project/all', project.getAllProjects);
	app.post('/project/update/:id', project.updateProject);
	app.post('/project/update', project.createNewProject);
	app.delete('/project/delete/:id', project.delete);
	app.get('/project/:id', project.getProjectById);
	app.get('/project/:projectName/lists/', list.getAllListsForProject);

	// app.all('/api/*', function(req,res) {
	// 	res.send(404);
	// });

	// app.get('*', function (req, res) {
	// 	res.render('index', {
	// 		bootstrappedUser: req.user
	// 	});
	// });
};