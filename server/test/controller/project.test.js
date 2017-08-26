const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai');
const assert = chai.assert;

let findCallback;
let saveCallback;

const ProjectModel = {
    find: ((options, callback) => {
        findCallback = callback;
    }),
    save: ((callback) => {
        saveCallback = callback;
    })
};

let sendResponseStub = sinon.stub();
let sendStatusStub = sinon.stub();
let sendJsonStub = sinon.stub();

const ProjectController = proxyquire('../../controllers/project.js', {
    'mongoose': {
        model: () => ProjectModel
    }
});

const testRes = {
    send: sendResponseStub,
    status: sendStatusStub,
    json: sendJsonStub
};
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

describe('createNewProject', () => {
    const testReqSuccess = {
        body: {
            projectName: 'bTest Project',
            colour: 'Yellow'
        }
    };

    afterEach(() => {
        sendResponseStub.reset();
        sendStatusStub.reset();
        sendJsonStub.reset();
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
            'Error: Project with the same name already exists, please choose another name.';
        assert.equal(testRes.status.lastCall.args[0], 400);
        assert(!testRes.send.called); // Test res.send is not called.
        assert.equal(testRes.json.lastCall.args[0].message, nameExistsError);
    });

    xit('should successfully post a new project', async () => {
        ProjectController.createNewProject(testReqSuccess, testRes);
        // Need to mock/stub new Project, line 22 in projects controller
        const newProjectSaveStub = sinon.stub(newProjectInstanceStub, 'save')
        findCallback(null, []);

        saveCallback(null, {
            projectName: 'test',
            colour: 'redish'
        });
        //assert.equal(testRes.send.called);
        //lastCall.args[0], 201);
    });

    xit('should error when posting a new project returns an error', async () => {
        ProjectController.createNewProject(testReqSuccess, testRes);
        // Need to mock/stub new Project, line 22 in projects controller
        const newProjectSaveStub = sinon.stub(newProjectInstanceStub, 'save')
        findCallback(null, []);

        saveCallback(err);
        //assert.equal(testRes.send.called);
        //lastCall.args[0], 201);
    });
});