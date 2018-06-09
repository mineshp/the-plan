const cookieSession = require('cookie-session');
const listMongodb = require('../mongodb/controllers/list');
const projectMongodb = require('../mongodb/controllers/project');
const listDynamodb = require('../dynamodb/controllers/list');
const projectDynamodb = require('../dynamodb/controllers/project');
const userMongodb = require('../mongodb/controllers/user');
const profileMongodb = require('../mongodb/controllers/profile');
const { authenticate, isAdmin } = require('../middlewares/authenticate');

const dbType = process.env.DB_TYPE || 'mongodb';
let list;
let project;
let user;
let profile;
if (dbType === 'mongodb') {
    list = listMongodb;
    project = projectMongodb;
    user = userMongodb;
    profile = profileMongodb;
} else {
    list = listDynamodb;
    project = projectDynamodb;
}

module.exports = function (app) {
    app.use(cookieSession({
        name: 'morpheus-session',
        keys: ['vJC3mBKEekM1wkfA4Gje', 'AsU9cUuydo49BgsvjYos']
    }));
    app.get('/api', (req, res) => {
        res.send('Welcome to the backend');
    });

    app.get('/api/admin/manage/users', authenticate, isAdmin, user.getAllUsers);
    app.delete('/api/admin/manage/users/delete/:id', authenticate, isAdmin, user.deleteUser);
    app.post('/api/admin/manage/users/update/:id', authenticate, isAdmin, user.updateUser);

    app.get('/api/admin/manage/profiles', authenticate, profile.getAllProfiles);
    app.post('/api/admin/manage/profiles/update/:id', authenticate, isAdmin, profile.updateProfile);
    app.post('/api/admin/manage/profiles/update', authenticate, isAdmin, profile.createNewProfile);
    app.delete('/api/admin/manage/profiles/delete/:id', authenticate, isAdmin, profile.deleteProfile);

    app.post('/api/user/register', user.register);
    app.post('/api/user/login', user.login);
    app.get('/api/user/:username', authenticate, user.getUser);
    app.post('/api/user/:id/setProfiles', authenticate, user.setProfilesToDisplay);

    app.post('/api/list/all', authenticate, list.getAllLists);
    app.get('/api/list/view/:id', authenticate, list.getListById);
    app.post('/api/list/update/:id', authenticate, list.updateList);
    app.post('/api/list/update', authenticate, list.createNewList);
    app.delete('/api/list/delete/:id', authenticate, list.delete);
    app.get('/api/list/generate/pdf/:id', authenticate, list.generatePDF);

    app.get('/api/project/all', authenticate, project.getAllProjects);
    app.get('/api/project/byProfiles', authenticate, project.getAllProjectsBySelectedProfiles);
    app.post('/api/project/update/:id', authenticate, project.updateProject);
    app.post('/api/project/update', authenticate, project.createNewProject);
    app.delete('/api/project/delete/:id', authenticate, project.delete);
    app.get('/api/project/:id', authenticate, project.getProjectById);
    app.get('/api/project/:projectName/lists/', authenticate, list.getAllListsForProject);

    app.all('/api/*', (req, res) => {
        res.sendStatus(404);
    });
};
