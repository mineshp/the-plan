/* eslint-disable import/first */
jest.mock('../../HOC/Authentication/Auth');
import Auth from '../../HOC/Authentication/Auth';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../controlCenter';
import { mockListUsers } from '../../helpers/test/testData/controlCenterData';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockUsers = mockListUsers();

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json'
    }
});

describe('Control Center actions', () => {
    const getToken = jest.fn();
    Auth.mockImplementation(() => ({ getToken }));
    describe('Retrieve Users actions', () => {
        const mockRetrieveUsersSuccessAPIResponse = mockUsers;

        const mockUsersRetrievalFailureAPIResponse = {
            message: 'Unable to retrieve users, please try again later.'
        };

        it('should dispatch an action for USERS_RETRIEVED when calling successRetrievingUsers to confirm users were retrieved', () => {
            const expectedAction = {
                type: 'USERS_RETRIEVED',
                data: mockRetrieveUsersSuccessAPIResponse
            };

            expect(actions.successRetrievingUsers(mockRetrieveUsersSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for USERS_RETRIEVED_ERROR when calling errorRetrievingUsers to notify the user we were unable to retrieve users', () => {
            const expectedAction = {
                type: 'USERS_RETRIEVED_ERROR',
                error: mockUsersRetrievalFailureAPIResponse.message
            };

            expect(actions.errorRetrievingUsers(mockUsersRetrievalFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful retrieveUsers call via the store, dispatches the LISTS_RETRIEVED action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockRetrieveUsersSuccessAPIResponse))));

            const store = mockStore({ controlCenter: [] });

            const expectedActions = [
                {
                    type: 'USERS_RETRIEVED',
                    data: mockRetrieveUsersSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.retrieveUsers()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful retrieveUsers call via the store, dispatches the USERS_RETRIEVED_ERROR action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockUsersRetrievalFailureAPIResponse))));

            const store = mockStore({ controlCenter: [] });

            const expectedAction = [
                {
                    type: 'USERS_RETRIEVED_ERROR',
                    error: mockUsersRetrievalFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.retrieveUsers()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Delete Users Actions', () => {
        const userIdToDelete = 1;

        it('should dispatch an action for USER_DELETION_SUCCESS when calling successDeletingUser to confirm a user has been deleted', () => {
            const mockDeleteSuccessAPIResponse = {
                ok: 1,
                n: 1
            };

            const expectedAction = {
                type: 'USER_DELETION_SUCCESS',
                data: mockDeleteSuccessAPIResponse
            };

            expect(actions.successDeletingUser(mockDeleteSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for USER_DELETION_ERROR when calling errorDeletingUser to notify the user a user has failed to be deleted', () => {
            const mockListDeletetionFailureAPIResponse = {
                message: 'Error deleting user'
            };

            const expectedAction = {
                type: 'USER_DELETION_ERROR',
                error: mockListDeletetionFailureAPIResponse.message
            };

            expect(actions.errorDeletingUser(mockListDeletetionFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful deleteUser call via the store, dispatches the LIST_DELETION_SUCCESS action', async () => {
            const mockDeleteSuccessAPIResponse = {
                ok: 1,
                n: 1
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockDeleteSuccessAPIResponse))));

            const store = mockStore({ controlCenter: [] });

            const expectedActions = [
                {
                    type: 'USER_DELETION_SUCCESS',
                    data: mockDeleteSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.deleteUser(userIdToDelete)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful deleteUser call via the store, dispatches the USER_DELETION_ERROR action', async () => {
            const mockListDeletetionFailureAPIResponse = {
                message: 'Error deleting user, please try again later.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockListDeletetionFailureAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedAction = [
                {
                    type: 'USER_DELETION_ERROR',
                    error: mockListDeletetionFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.deleteUser(userIdToDelete)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });
});
