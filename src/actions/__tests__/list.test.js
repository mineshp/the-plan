/* eslint-disable import/first */
jest.mock('../../HOC/Authentication/Auth');
import Auth from '../../HOC/Authentication/Auth';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../list';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json'
    }
});

describe('List actions', () => {
    const getToken = jest.fn();
    Auth.mockImplementation(() => ({ getToken }));
    describe('Get all list actions', () => {
        const mockListSuccessAPIResponse = [
            {
                _id: '1234',
                project: ['a', 'b'],
                listName: 'Shopping List',
                createdDate: '2016-05-18T16:00:00Z',
                updatedDate: '2016-05-18T16:00:00Z'
            },
            {
                _id: '1235',
                project: ['b'],
                listName: 'Holiday',
                createdDate: '2016-05-19T16:00:00Z',
                updatedDate: '2016-05-19T16:05:00Z',
            }
        ];

        const mockListRetrievalFailureAPIResponse = {
            message: 'Unable to retrieve lists, please try again later.'
        };

        it('should dispatch an action for LISTS_RETRIEVED when calling successListingLists to confirm lists were retrieved', () => {
            const expectedAction = {
                type: 'LISTS_RETRIEVED',
                data: mockListSuccessAPIResponse
            };

            expect(actions.successListingLists(mockListSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for LISTS_RETRIEVED_ERROR when calling errorListingLists to notify the user we were unable to retrieve lists', () => {
            const expectedAction = {
                type: 'LISTS_RETRIEVED_ERROR',
                error: mockListRetrievalFailureAPIResponse.message
            };

            expect(actions.errorListingLists(mockListRetrievalFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful retrieveSummaryLists call via the store, dispatches the LISTS_RETRIEVED action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockListSuccessAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedActions = [
                {
                    type: 'LISTS_RETRIEVED',
                    data: mockListSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.retrieveSummaryLists()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful retrieveLists call via the store, dispatches the LISTS_RETRIEVED_ERROR action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockListRetrievalFailureAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedAction = [
                {
                    type: 'LISTS_RETRIEVED_ERROR',
                    error: mockListRetrievalFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.retrieveSummaryLists()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Get lists for a given project actions', () => {
        const mockListSuccessAPIResponse = [
            {
                _id: '1234',
                project: ['a', 'b'],
                listName: 'Shopping List',
                createdDate: '2016-05-18T16:00:00Z',
                updatedDate: '2016-05-18T16:00:00Z'
            },
            {
                _id: '1235',
                project: ['b'],
                listName: 'Holiday',
                createdDate: '2016-05-19T16:00:00Z',
                updatedDate: '2016-05-19T16:05:00Z',
            }
        ];

        const mockListRetrievalFailureAPIResponse = {
            message: 'Unable to retrieve lists, please try again later.'
        };

        it('a successful retrieveSummaryListsByProject call via the store, dispatches the LISTS_RETRIEVED action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockListSuccessAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedActions = [
                {
                    type: 'LISTS_RETRIEVED',
                    data: mockListSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.retrieveSummaryListsByProject('b')).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful retrieveLists call via the store, dispatches the LISTS_RETRIEVED_ERROR action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockListRetrievalFailureAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedAction = [
                {
                    type: 'LISTS_RETRIEVED_ERROR',
                    error: mockListRetrievalFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.retrieveSummaryListsByProject('x')).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Get a single list actions', () => {
        const mockListSuccessAPIResponse = [
            {
                _id: '1234',
                project: ['a', 'b'],
                listName: 'Shopping List',
                createdDate: '2016-05-18T16:00:00Z',
                updatedDate: '2016-05-18T16:00:00Z'
            }
        ];

        const mockSingleListRetrievalFailureAPIResponse = {
            message: 'Unable to retrieve list with id 1234, please try again later.'
        };

        it('should dispatch an action for LIST_RETRIEVED when calling successRetrievingList to confirm a list was retrieved', () => {
            const expectedAction = {
                type: 'LIST_RETRIEVED',
                data: mockListSuccessAPIResponse
            };

            expect(actions.successRetrievingList(mockListSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for LIST_RETRIEVED_ERROR when calling errorRetrievingList to notify the user we were unable to retrieve a list', () => {
            const expectedAction = {
                type: 'LIST_RETRIEVED_ERROR',
                error: mockSingleListRetrievalFailureAPIResponse.message
            };

            expect(actions.errorRetrievingList(mockSingleListRetrievalFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful retrieveListById call via the store, dispatches the LIST_RETRIEVED action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockListSuccessAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedActions = [
                {
                    type: 'LIST_RETRIEVED',
                    data: mockListSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.retrieveListById(1234)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful retrieveListById call via the store, dispatches the LIST_RETRIEVED_ERROR action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockSingleListRetrievalFailureAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedAction = [
                {
                    type: 'LIST_RETRIEVED_ERROR',
                    error: mockSingleListRetrievalFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.retrieveListById(1234)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Create List Actions', () => {
        const mockNewListCreationSuccessAPIResponse = {
            _id: '1234TESTABC',
            projects: [{ name: 'Alpha', id: '00123' }, { name: 'Beta', id: '00124' }],
            listName: 'Explorers',
            createdDate: '2017-10-15T09:02:00.000Z',
            updatedDate: '2017-10-15T09:30:00.000Z',
            headings: [{ name: 'A', id: '000001' }, { name: 'B', id: '000002' }],
            items: [{
                id: 'aax',
                columns: [
                    {
                        columnName: 'Name',
                        columnValue: 'Mario',
                        columnId: '001mk'
                    },
                    {
                        columnName: 'OutfitColour',
                        columnValue: 'Red',
                        columnId: '002mk'
                    }
                ]
            },
            {
                id: 'aay',
                columns: [
                    {
                        columnName: 'Name',
                        columnValue: 'Luigi',
                        columnId: '003mk'
                    },
                    {
                        columnName: 'OutfitColour',
                        columnValue: 'Green',
                        columnId: '004mk'
                    }
                ]
            }]
        };

        it('should dispatch an action for LIST_CREATION_SUCCESS when calling createdList to notify the user a list has been created', () => {
            const expectedAction = {
                type: 'LIST_CREATION_SUCCESS',
                data: mockNewListCreationSuccessAPIResponse
            };

            expect(actions.createdList(mockNewListCreationSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for LIST_CREATION_ERROR when calling create to notify the user there was an error creating the list', () => {
            const mockNewListCreationFailureAPIResponse = {
                message: 'Error creating list'
            };

            const expectedAction = {
                type: 'LIST_CREATION_ERROR',
                error: mockNewListCreationFailureAPIResponse.message
            };

            expect(actions.errorCreatingList(mockNewListCreationFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful create list call via the store, dispatches the LIST_CREATION_SUCCESS action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockNewListCreationSuccessAPIResponse))));


            const store = mockStore({ list: {} });
            const newListData = {
                listName: 'test'
            };

            const expectedActions = [
                {
                    type: 'LIST_CREATION_SUCCESS',
                    data: mockNewListCreationSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.create(newListData)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful create list call via the store, dispatches the LIST_CREATION_ERROR action', async () => {
            const mockNewListCreationFailureAPIResponse = {
                message: 'Error creating list test, list already exists.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(403, null, JSON.stringify(mockNewListCreationFailureAPIResponse))));


            const store = mockStore({ list: {} });
            const newListData = {
                listName: 'test'
            };

            const expectedAction = [
                {
                    type: 'LIST_CREATION_ERROR',
                    error: mockNewListCreationFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.create(newListData)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Update List Actions', () => {
        const existingListToUpdate = {
            _id: '1234TESTABC',
            projects: [{ name: 'Alpha', id: '00123' }, { name: 'Beta', id: '00124' }],
            listName: 'Explorers',
            createdDate: '2017-10-15T09:02:00.000Z',
            updatedDate: '2017-10-15T09:30:00.000Z',
            headings: [{ name: 'A', id: '000001' }, { name: 'B', id: '000002' }],
            items: [{
                id: 'aax',
                columns: [
                    {
                        columnName: 'Name',
                        columnValue: 'Mario',
                        columnId: '001mk'
                    },
                    {
                        columnName: 'OutfitColour',
                        columnValue: 'Red',
                        columnId: '002mk'
                    }
                ]
            },
            {
                id: 'aay',
                columns: [
                    {
                        columnName: 'Name',
                        columnValue: 'Luigi',
                        columnId: '003mk'
                    },
                    {
                        columnName: 'OutfitColour',
                        columnValue: 'Green',
                        columnId: '004mk'
                    }
                ]
            }]
        };

        it('should dispatch an action for LIST_UPDATE_SUCCESS when calling updatedList to notify the user a list has been updated', () => {
            const expectedAction = {
                type: 'LIST_UPDATE_SUCCESS',
                data: existingListToUpdate
            };

            expect(actions.updatedList(existingListToUpdate)).toEqual(expectedAction);
        });

        it('should dispatch an action for LIST_UPDATE_ERROR when calling update to notify the user there was an error updating the list', () => {
            const mockListUpdateFailureAPIResponse = {
                message: 'Error updating list'
            };

            const expectedAction = {
                type: 'LIST_UPDATE_ERROR',
                error: mockListUpdateFailureAPIResponse.message
            };

            expect(actions.errorUpdatingList(mockListUpdateFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful update list call via the store, dispatches the LIST_UPDATE_SUCCESS action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(existingListToUpdate))));

            const store = mockStore({ list: {} });

            const expectedActions = [
                {
                    type: 'LIST_UPDATE_SUCCESS',
                    data: existingListToUpdate
                }
            ];

            return store.dispatch(actions.update(existingListToUpdate)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful update list call via the store, dispatches the LIST_UPDATE_ERROR action', async () => {
            const mockListUpdateFailureAPIResponse = {
                message: 'Error updating list Explorers, please try again later.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(403, null, JSON.stringify(mockListUpdateFailureAPIResponse))));


            const store = mockStore({ list: {} });

            const expectedAction = [
                {
                    type: 'LIST_UPDATE_ERROR',
                    error: mockListUpdateFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.update(existingListToUpdate)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Delete List Actions', () => {
        const listIdToDelete = 1;

        it('should dispatch an action for LIST_DELETION_SUCCESS when calling deletedList to confirm a list has been deleted', () => {
            const mockDeleteSuccessAPIResponse = {
                ok: 1,
                n: 1,
                listName: 'TEST LIST'
            };

            const expectedAction = {
                type: 'LIST_DELETION_SUCCESS',
                data: mockDeleteSuccessAPIResponse
            };

            expect(actions.deletedList(mockDeleteSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for LIST_DELETION_ERROR when calling errorDeletingList to notify the user a list has failed to be deleted', () => {
            const mockListDeletetionFailureAPIResponse = {
                message: 'Error deleting list'
            };

            const expectedAction = {
                type: 'LIST_DELETION_ERROR',
                error: mockListDeletetionFailureAPIResponse.message
            };

            expect(actions.errorDeletingList(mockListDeletetionFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful deleteList call via the store, dispatches the LIST_DELETION_SUCCESS action', async () => {
            const mockDeleteSuccessAPIResponse = {
                ok: 1,
                n: 1,
                listName: 'TEST LIST'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockDeleteSuccessAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedActions = [
                {
                    type: 'LIST_DELETION_SUCCESS',
                    data: mockDeleteSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.deleteList(listIdToDelete)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful deleteList call via the store, dispatches the LIST_DELETION_ERROR action', async () => {
            const mockListDeletetionFailureAPIResponse = {
                message: 'Error deleting list, please try again later.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockListDeletetionFailureAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedAction = [
                {
                    type: 'LIST_DELETION_ERROR',
                    error: mockListDeletetionFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.deleteList(listIdToDelete)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Download List Actions', () => {
        const listIdToDownload = 123;
        const mockListDownloadSuccessAPIResponse = {
            _id: '1234',
            project: ['a', 'b'],
            listName: 'Shopping List',
            createdDate: '2016-05-18T16:00:00Z',
            updatedDate: '2016-05-18T16:00:00Z'
        };
        it('should dispatch an action for PDF_DOWNLOAD_SUCCESS when calling successDownloadingPDF to confirm a list has been downloaded', () => {
            const expectedAction = {
                type: 'PDF_DOWNLOAD_SUCCESS',
                data: mockListDownloadSuccessAPIResponse
            };

            expect(actions.successDownloadingPDF(mockListDownloadSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for PDF_DOWNLOAD_ERROR when calling errorDownloadingPDF to notify the user a list has failed to be downloaded', () => {
            const mockListDownloadFailureAPIResponse = {
                message: 'Unable to download PDF, please try again later.'
            };

            const expectedAction = {
                type: 'PDF_DOWNLOAD_ERROR',
                error: mockListDownloadFailureAPIResponse.message
            };

            expect(actions.errorDownloadingPDF(mockListDownloadFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful downloadPDF call via the store, dispatches the PDF_DOWNLOAD_SUCCESS action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockListDownloadSuccessAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedActions = [
                {
                    type: 'PDF_DOWNLOAD_REQUEST',
                },
                {
                    type: 'PDF_DOWNLOAD_SUCCESS',
                    data: mockListDownloadSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.downloadPDF(listIdToDownload)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful downloadPDF call via the store, dispatches the PDF_DOWNLOAD_ERROR action', async () => {
            const mockListDownloadFailureAPIResponse = {
                message: 'Unable to download PDF, please try again later.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockListDownloadFailureAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedAction = [
                {
                    type: 'PDF_DOWNLOAD_REQUEST'
                },
                {
                    type: 'PDF_DOWNLOAD_ERROR',
                    error: mockListDownloadFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.downloadPDF(listIdToDownload)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });
});
