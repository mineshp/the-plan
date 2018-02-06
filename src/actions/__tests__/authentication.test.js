/* eslint-disable import/first */
jest.mock('../../HOC/Authentication/Auth');
import Auth from '../../HOC/Authentication/Auth';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../authentication';
import { mockRegisterUser, mockLoginDetails, mockLoginUser } from '../../helpers/test/testData/authenticationData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json'
    }
});

describe('User authentication', () => {
    describe('Register User', () => {
        const mockRegisterUserSuccessAPIResponse = [
            mockRegisterUser()
        ];
        const mockRegisterUserFailureAPIResponse = {
            message: `Unable to register user ${mockRegisterUserSuccessAPIResponse.username}, please try again later.`
        };

        it('should dispatch an action for SUCCESS_USER_REGISTERED when calling successRegisteringUser to confirm user was registered', () => {
            const expectedAction = {
                type: 'SUCCESS_USER_REGISTERED',
                data: mockRegisterUserSuccessAPIResponse
            };

            expect(actions.successRegisteringUser(mockRegisterUserSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for ERROR_USER_REGISTERED when calling errorRegisteringUser to notify the user we were unable to register the user', () => {
            const expectedAction = {
                type: 'ERROR_USER_REGISTERED',
                error: mockRegisterUserFailureAPIResponse.message
            };

            expect(actions.errorRegisteringUser(mockRegisterUserFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful registerUser call via the store, dispatches the SUCCESS_USER_REGISTERED action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockRegisterUserSuccessAPIResponse))));

            const store = mockStore({ authentication: [] });

            const expectedActions = [
                {
                    type: 'SUCCESS_USER_REGISTERED',
                    data: mockRegisterUserSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.registerUser(mockRegisterUserSuccessAPIResponse)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful registerUser call via the store, dispatches the ERROR_USER_REGISTERED action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockRegisterUserFailureAPIResponse))));

            const store = mockStore({ authentication: [] });

            const expectedAction = [
                {
                    type: 'ERROR_USER_REGISTERED',
                    error: mockRegisterUserFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.registerUser(mockRegisterUserSuccessAPIResponse)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Login User', () => {
        const getToken = jest.fn();
        Auth.mockImplementation(() => ({ getToken }));

        const mockLoginUserFailureApiResponse = {
            message: `Unable to login with username ${mockLoginUser().user.username}.`
        };

        it('should dispatch an action for SUCCESS_LOGIN when calling successLogin to confirm user logged in', () => {
            const { user, token } = mockLoginUser();
            const expectedAction = {
                type: 'SUCCESS_LOGIN',
                user: {
                    username: user.username
                },
                token
            };

            expect(actions.successLogin(mockLoginUser())).toEqual(expectedAction);
        });

        it('should dispatch an action for ERROR_LOGIN when calling errorLogin to notify the user we were unable to login', () => {
            const expectedAction = {
                type: 'ERROR_LOGIN',
                error: mockLoginUserFailureApiResponse.message
            };

            expect(actions.errorLogin(mockLoginUserFailureApiResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful loginUser call via the store, dispatches the SUCCESS_LOGIN action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockLoginUser()))));

            const store = mockStore({ authentication: [] });
            const { user, token } = mockLoginUser();
            const expectedActions = [
                {
                    type: 'SET_CURRENT_USER',
                    user: {
                        username: user.username
                    }
                },
                {
                    type: 'SUCCESS_LOGIN',
                    user: {
                        username: user.username
                    },
                    token
                }
            ];

            return store.dispatch(actions.loginUser(mockLoginDetails())).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful loginUser call via the store, dispatches the ERROR_LOGIN action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockLoginUserFailureApiResponse))));

            const store = mockStore({ authentication: [] });

            const expectedAction = [
                {
                    type: 'ERROR_LOGIN',
                    error: mockLoginUserFailureApiResponse.message
                }
            ];

            return store.dispatch(actions.loginUser(mockLoginDetails())).then(() => {
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Set Current User', () => {
        it('should dispatch an action for SET_CURRENT_USER when calling setCurrentUser', () => {
            const { user } = mockLoginUser();
            const expectedAction = {
                type: 'SET_CURRENT_USER',
                user: {
                    username: user.username
                }
            };

            expect(actions.setCurrentUser(user)).toEqual(expectedAction);
        });
    });

    describe('Logout User', () => {
        it('should dispatch an action for SET_CURRENT_USER when calling setCurrentUser', () => {
            const store = mockStore({ authentication: [] });
            const expectedActions = [{
                type: 'SET_CURRENT_USER',
                user: {}
            }];

            store.dispatch(actions.logout());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
