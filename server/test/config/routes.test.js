const request = require('supertest');
var nock = require('nock');
const app = require('../../app');
const config = require('../../config/config')[process.env.NODE_ENV];
const chai = require('chai');
const expect = chai.expect;
const Project = require('mongoose').model('Project');

// For tests if we use the db, use a test db
// const removeAll = async () => {
//     await Project.remove({});
// };

describe('Test the root path /', () => {
    it('should return a 200 success status', () => {
        return request(app).get("/").then(response => {
            expect(response.statusCode).to.equal(200);
        })
    });

    it('should return a message', () => {
        return request(app).get("/").then(response => {
            expect(response.text).to.equal('Welcome to the backend');
        })
    });
});

describe('Test the path /project/all', () => {
    it('should return a 200 success status', () => {
        return request(app).get("/project/all").then(response => {
            expect(response.statusCode).to.equal(200);
        })
    });
});

describe('Test the path /project/create', () => {
    it('should return an array of projects', () => {
        const newProject = {
            projectName: 'test-project',
            colour: 'purpleish'
        };

        nock(`http://localhost:${config.port}`)
            .post('//project/create/')
            //respond with a OK and the specified JSON response
            .reply(200, {
                data: {
                        __v: 0,
                        projectName: newProject.projectName,
                        colour: newProject.colour,
                        _id: Math.random(),
                        createdDate: '2017-08-21'
                }
            });
    });
});

describe('Test the path /project/delete/:id', () => {
    afterEach(() => {
		// removeAll();
    });

    xit('should return a 200 success status', () => {
        return request(app).del("/project/delete/:id").then(response => {
            expect(response.statusCode).to.equal(200);
        })
    });
});

