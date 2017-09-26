import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../project';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json'
    }
});

describe('Project actions', () => {
    describe('Create Project Actions', () => {
        it('should dispatch an action to create a new project', () => {
            const expectedAction = {
                type: 'CREATE_PROJECT',
                projectName: 'newProjectName',
                colour: 'blue'
            };
            expect(actions.createProject('newProjectName', 'blue')).toEqual(expectedAction);
        });

        it('should dispatch an action to notify the user a project has been created', () => {
            const mockNewProjectCreationSuccessAPIResponse = {
                _id: '1234',
                projectName: 'TEST PROJECT',
                colour: 'green',
                createdDate: '2017-08-15T12:02:00.000Z'
            };

            const expectedAction = {
                type: 'PROJECT_CREATION_SUCCESS',
                data: mockNewProjectCreationSuccessAPIResponse
            };

            expect(actions.createdProject(mockNewProjectCreationSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch to successfully created project action', async () => {
            const mockNewProjectCreationSuccessAPIResponse = {
                _id: '1234',
                projectName: 'TEST PROJECT',
                colour: 'green',
                createdDate: '2017-08-15T12:02:00.000Z'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockNewProjectCreationSuccessAPIResponse))));


            const store = mockStore({ project: {} });
            const newProjectData = {
                projectName: 'test',
                colour: 'bluey'
            };

            const expectedActions = [
                {
                    type: 'PROJECT_CREATION_SUCCESS',
                    data: mockNewProjectCreationSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.create(newProjectData)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('should dispatch to error creating project action', async () => {
            const mockNewProjectCreationFailureAPIResponse = {
                message: 'Unable to create new project, please try again later.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(403, null, JSON.stringify(mockNewProjectCreationFailureAPIResponse))));


            const store = mockStore({ project: {} });
            const newProjectData = {
                projectName: 'test',
                colour: 'bluey'
            };

            const expectedAction = [
                {
                    type: 'PROJECT_CREATION_ERROR',
                    error: mockNewProjectCreationFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.create(newProjectData)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });

        it('should dispatch an action to notify the user a project has failed to created', () => {
            const mockNewProjectCreationFailureAPIResponse = {
                message: 'Error creating project'
            };

            const expectedAction = {
                type: 'PROJECT_CREATION_ERROR',
                error: mockNewProjectCreationFailureAPIResponse.message
            };

            expect(actions.errorCreatingProject(mockNewProjectCreationFailureAPIResponse.message))
                .toEqual(expectedAction);
        });
    });

    describe('Delete Project Actions', () => {
        const projectIdToDelete = 1;

        it('should dispatch an action to notify the user a project has been deleted', () => {
            const mockDeleteSuccessAPIResponse = {
                ok: 1,
                n: 1,
                projectName: 'TEST PROJECT'
            };

            const expectedAction = {
                type: 'PROJECT_DELETION_SUCCESS',
                data: mockDeleteSuccessAPIResponse
            };

            expect(actions.deletedProject(mockDeleteSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch to successfully deleted project action', async () => {
            const mockDeleteSuccessAPIResponse = {
                ok: 1,
                n: 1,
                projectName: 'TEST PROJECT'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockDeleteSuccessAPIResponse))));

            const store = mockStore({ projects: [] });

            const expectedActions = [
                {
                    type: 'PROJECT_DELETION_SUCCESS',
                    data: mockDeleteSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.deleteProject(projectIdToDelete)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('should dispatch to error deleting project action', async () => {
            const mockProjectDeletetionFailureAPIResponse = {
                message: 'Unable to delete new project, please try again later.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockProjectDeletetionFailureAPIResponse))));

            const store = mockStore({ projects: [] });

            const expectedAction = [
                {
                    type: 'PROJECT_DELETION_ERROR',
                    error: mockProjectDeletetionFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.deleteProject(projectIdToDelete)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });

        it('should dispatch an action to notify the user a project has failed to be deleted', () => {
            const mockProjectDeletetionFailureAPIResponse = {
                message: 'Error deleting project'
            };

            const expectedAction = {
                type: 'PROJECT_DELETION_ERROR',
                error: mockProjectDeletetionFailureAPIResponse.message
            };

            expect(actions.errorDeletingProject(mockProjectDeletetionFailureAPIResponse.message))
                .toEqual(expectedAction);
        });
    });
});
