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
});
