const listMongodb = require('../mongodb/controllers/list');
const projectMongodb = require('../mongodb/controllers/project');
const listDynamodb = require('../dynamodb/controllers/list');
const projectDynamodb = require('../dynamodb/controllers/project');
const userMongodb = require('../mongodb/controllers/user');

const dbType = process.env.DB_TYPE || 'mongodb';
let list;
let project;
let user;
if (dbType === 'mongodb') {
    list = listMongodb;
    project = projectMongodb;
    user = userMongodb;
} else {
    list = listDynamodb;
    project = projectDynamodb;
}


module.exports = function (app) {
    app.get('/api', function (req, res) {
        res.send('Welcome to the backend')
    });

	app.post('/api/user/register', user.register);

	app.get('/api/list/all', list.getAllLists);
	app.get('/api/list/view/:id', list.getListById);
	app.post('/api/list/update/:id', list.updateList);
	app.post('/api/list/update', list.createNewList);
	app.delete('/api/list/delete/:id', list.delete);
	app.get('/api/list/generate/pdf/:id', list.generatePDF);

	app.get('/api/project/all', project.getAllProjects);
	app.post('/api/project/update/:id', project.updateProject);
	app.post('/api/project/update', project.createNewProject);
	app.delete('/api/project/delete/:id', project.delete);
	app.get('/api/project/:id', project.getProjectById);
	app.get('/api/project/:projectName/lis0ts/', list.getAllListsForProject);

	app.all('/api/*', function(req,res) {
		res.sendStatus(404);
	});

	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, './index.html'));
	});
};