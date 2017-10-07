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
        it('should dispatch an action for CREATE_PROJECT when calling createProject to create a new project', () => {
            const expectedAction = {
                type: 'CREATE_PROJECT',
                projectName: 'newProjectName',
                colour: 'blue'
            };
            expect(actions.createProject('newProjectName', 'blue')).toEqual(expectedAction);
        });

        it('should dispatch an action for PROJECT_CREATION_SUCCESS when calling createdProject to notify the user a project has been created', () => {
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

        it('should dispatch an action for PROJECT_CREATION_ERROR when calling create to notify the user there was an error creating the project', () => {
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

        it('a successful create project call via the store, dispatches the PROJECT_CREATION_SUCCESS action', async () => {
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

        it('an unsuccessful create project call via the store, dispatches the PROJECT_CREATION_ERROR action', async () => {
            const mockNewProjectCreationFailureAPIResponse = {
                message: 'Error creating project test, project already exists.'
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
    });

    describe('Delete Project Actions', () => {
        const projectIdToDelete = 1;

        it('should dispatch an action for PROJECT_DELETION_SUCCESS when calling deletedProject to confirm a project has been deleted', () => {
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

        it('should dispatch an action for PROJECT_DELETION_ERROR when calling errorDeletingProject to notify the user a project has failed to be deleted', () => {
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

        it('a successful deleteProject call via the store, dispatches the PROJECT_DELETION_SUCCESS action', async () => {
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

        it('an unsuccessful deleteProject call via the store, dispatches the PROJECT_DELETION_ERROR action', async () => {
            const mockProjectDeletetionFailureAPIResponse = {
                message: 'Error deleting project, please try again later.'
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
    });

    describe('Update Project Actions', () => {
        const projectToUodate = {
            _id: '1234',
            projectName: 'Senorita',
            colour: 'gold'
        };

        it('should dispatch an action for PROJECT_UPDATE_SUCCESS when calling updatedProject to confirm a project has been updated', () => {

            const expectedAction = {
                type: 'PROJECT_UPDATE_SUCCESS',
                data: projectToUodate
            };

            expect(actions.updatedProject(projectToUodate)).toEqual(expectedAction);
        });

        it('should dispatch an action for PROJECT_UPDATE_ERROR when calling errorUpdatingProject to notify the user a project has failed to be updated', () => {
            const mockProjectUpdateFailureAPIResponse = {
                message: 'Error updating project'
            };

            const expectedAction = {
                type: 'PROJECT_UPDATE_ERROR',
                error: mockProjectUpdateFailureAPIResponse.message
            };

            expect(actions.errorUpdatingProject(mockProjectUpdateFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful update call via the store, dispatches the PROJECT_UPDATE_SUCCESS action', async () => {
            const projectToUpdate = {
                _id: '1234',
                projectName: 'Senorita',
                colour: 'gold'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(projectToUpdate))));

            const store = mockStore({});

            const expectedActions = [
                {
                    type: 'PROJECT_UPDATE_SUCCESS',
                    data: projectToUpdate
                }
            ];

            return store.dispatch(actions.update(projectToUpdate)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful update call via the store, dispatches the PROJECT_UPDATE_ERROR action', async () => {
            const mockProjectUpdateFailureAPIResponse = {
                message: 'Error updating project oldName, please try again later.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockProjectUpdateFailureAPIResponse))));

            const store = mockStore({
                _id: '123',
                projectName: 'Old Project'
            });

            const expectedAction = [
                {
                    type: 'PROJECT_UPDATE_ERROR',
                    error: mockProjectUpdateFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.update({ projectName: 'oldName' })).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('List Project Actions', () => {
        const mockListSuccessAPIResponse = [
            {
                _id: '5992d50066a7043f2598e12d',
                projectName: 'PROJECT 1',
                colour: 'red',
                createdDate: '2017-08-15T12:02:00.000Z'
            },
            {
                _id: '59a08710e57cb1da97cd1477',
                projectName: 'PROJECT 2',
                colour: 'red',
                __v: 0,
                createdDate: '2017-08-25T20:22:40.994Z'
            },
            {
                _id: '59a08bb6e57cb1da97cd1478',
                projectName: 'PROJECT 3',
                colour: 'grey',
                __v: 0,
                createdDate: '2017-08-25T20:42:30.159Z'
            }
        ];

        const mockNewProjectCreationFailureAPIResponse = {
            message: 'Unable to retrieve projects, please try again later.'
        };

        it('should dispatch an action for PROJECT_LIST_RETRIEVED when calling successListingProjects to confirm projects lists were retrieved', () => {
            const expectedAction = {
                type: 'PROJECT_LIST_RETRIEVED',
                data: mockListSuccessAPIResponse
            };

            expect(actions.successListingProjects(mockListSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for PROJECT_LIST_ERROR when calling errorListingProjects to notify the user a project has failed to be listed', () => {
            const mockProjectListingFailureAPIResponse = {
                message: 'Error listing project'
            };

            const expectedAction = {
                type: 'PROJECT_LIST_ERROR',
                error: mockProjectListingFailureAPIResponse.message
            };

            expect(actions.errorListingProjects(mockProjectListingFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful listProjects call via the store, dispatches the PROJECT_LIST_RETRIEVED action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockListSuccessAPIResponse))));

            const store = mockStore({ projects: [] });

            const expectedActions = [
                {
                    type: 'PROJECT_LIST_RETRIEVED',
                    data: mockListSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.listProjects()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful listProjects call via the store, dispatches the PROJECT_LIST_ERROR action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockNewProjectCreationFailureAPIResponse))));

            const store = mockStore({ projects: [] });

            const expectedAction = [
                {
                    type: 'PROJECT_LIST_ERROR',
                    error: mockNewProjectCreationFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.listProjects()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Fetch Single Project Action', () => {
        const mockFetchSingleProjectSuccessAPIResponse = {
            _id: '1234',
            projectName: 'PROJECT 1',
            colour: 'red',
            createdDate: '2017-08-15T12:02:00.000Z'
        };

        const mockFetchSingleProjectFailureAPIResponse = {
            message: 'Unable to retrieve project with id 1234, please try again later.'
        };

        it('should dispatch an action for SINGLE_PROJECT_RETRIEVED when calling successFetchingProject to confirm a project was retrieved', () => {
            const expectedAction = {
                type: 'SINGLE_PROJECT_RETRIEVED',
                data: mockFetchSingleProjectSuccessAPIResponse
            };

            expect(actions.successFetchingProject(mockFetchSingleProjectSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for SINGLE_PROJECT_ERROR when calling errorFetchingProject to notify the user a project has failed to be listed', () => {
            const expectedAction = {
                type: 'SINGLE_PROJECT_ERROR',
                error: mockFetchSingleProjectFailureAPIResponse.message
            };

            expect(actions.errorFetchingProject(mockFetchSingleProjectFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful fetchSingleProject call via the store, dispatches the SINGLE_PROJECT_RETRIEVED action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockFetchSingleProjectSuccessAPIResponse))));

            const store = mockStore({ projects: [] });

            const expectedActions = [
                {
                    type: 'SINGLE_PROJECT_RETRIEVED',
                    data: mockFetchSingleProjectSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.fetchSingleProject(1234)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful fetchSingleProject call via the store, dispatches the SINGLE_PROJECT_ERROR action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockFetchSingleProjectFailureAPIResponse))));

            const store = mockStore({ projects: [] });

            const expectedAction = [
                {
                    type: 'SINGLE_PROJECT_ERROR',
                    error: mockFetchSingleProjectFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.fetchSingleProject(1234)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });
});
