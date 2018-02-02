const listMongodb = require('../mongodb/controllers/list');
const projectMongodb = require('../mongodb/controllers/project');
const listDynamodb = require('../dynamodb/controllers/list');
const projectDynamodb = require('../dynamodb/controllers/project');
const userMongodb = require('../mongodb/controllers/user');
const User = require('mongoose').model('User');

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
    app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

    // app.use(passport.initialize());
    // app.use(passport.session());

    app.get('/api', (req, res) => {
        res.send('Welcome to the backend')
    });

    app.post('/api/user/register', user.register);
    app.post('/api/user/login', user.login);

    app.get('/api/list/all',
        // require('connect-ensure-login').ensureLoggedIn(),
        list.getAllLists
    );
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

    app.all('/api/*', (req,res) => {
		res.sendStatus(404);
	});

    // app.get('*', function (req, res) {
    // 	res.sendFile(path.join(__dirname, './index.html'));
    // });
};
