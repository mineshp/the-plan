const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');
const assert = chai.assert;

let findCallback;
const ProjectModel = {
    find: ((options, callback) => {
        findCallback = callback;
    }),
    new: () => {}
};

let sendResponseStub = sinon.stub();

const ProjectController = proxyquire('../../controllers/project.js', {
    'mongoose': {
        model: () => ProjectModel
    }
});

const testRes = { send: sendResponseStub };
const testReq = {
    body: {
        projectName: 'aTest Project',
        colour: 'Grey'
    }
};
const testColl = 'test collection';

describe('getAllProjects', () => {
    afterEach(() => {
        sendResponseStub.reset();
    });

    it('should return a list of projects', async () => {
        ProjectController.getAllProjects(null, testRes);

        findCallback(null, testColl);
        assert(testRes.send.calledWith(testColl));
    });
});

describe.only('createNewProject', () => {
    afterEach(() => {
        sendResponseStub.reset();
    });

    it('should error if project with same name already exists', async () => {
        const projectAlreadyExistsCollection = [
            {
                _id: 1234,
                projectName: 'aTest Project'
            }
        ];
        ProjectController.createNewProject(testReq, testRes);
        // findCallback(error, collection)
        findCallback(null, projectAlreadyExistsCollection);
        const nameExistsError =
            'Project with the same name already exists, please choose another name.';
        assert.equal(testRes.send.lastCall.args[0].message, nameExistsError);
        // Test error message with Error library§
    });

    it('should successfully post a new project', async () => {
        ProjectController.createNewProject(testReq, testRes);
        // Need to mock/stub new Project, line 22 in projects controller
        findCallback(null, []);
    });
});