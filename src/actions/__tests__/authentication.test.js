import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../authentication';

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
            {
                email: 'test@test.com',
                username: 'testUser',
                password: 'password123',
                confirmPassword: 'password123'
            }
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

            const store = mockStore({ user: [] });

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
});
