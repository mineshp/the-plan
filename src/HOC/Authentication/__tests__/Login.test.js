
jest.mock('../Auth');
import Auth from '../Auth';

import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../Login';
import mockEvent from '../../../helpers/test/testData';

const handleSubmitMock = jest.fn();
const handleChangeMock = jest.fn();

const props = {
    actions: {
        loginUser: jest.fn(() => (
            Promise.resolve({
                type: 'SUCCESS_LOGIN',
                token: 'asecrettokenonlyforyou',
                username: 'testUser'
            })
        )),
        addNotification: jest.fn(() => (
            Promise.resolve()
        ))
    },
    notification: null
};

const context = {
    router: {
        history: {
            push: jest.fn()
        }
    }
};

const setToken = jest.fn();
Auth.mockImplementation(() => ({ setToken }));

describe('Login User', () => {
    describe('with valid login credentials', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<Login
                handleSubmit={handleSubmitMock}
                handleChange={handleChangeMock}
                {...props}
            />, { context }
            );

            props.actions.loginUser.mockClear();
            props.actions.addNotification.mockClear();
            context.router.history.push.mockClear();
        });

        it('calls handleChange for username input field', async () => {
            const inputLoginDetailsEvent = Object.assign({}, mockEvent(), {
                target: {
                    name: 'username',
                    value: 'test'
                }
            });

            await wrapper.instance().handleChange(inputLoginDetailsEvent);

            expect(wrapper.state().username).toEqual('test');
        });

        it('calls handleChange for password input field', async () => {
            const inputPasswordLoginDetailsEvent = Object.assign({}, mockEvent(), {
                target: {
                    name: 'password',
                    value: 'secret'
                }
            });

            await wrapper.instance().handleChange(inputPasswordLoginDetailsEvent);

            expect(wrapper.state().password).toEqual('secret');
        });

        it('calls the loginUser action if username and password is valid', async () => {
            const loginUserSpyValid = jest.spyOn(Login.prototype, 'loginUser');
            wrapper.setState({
                username: 'testUser',
                password: 'password'
            });

            await wrapper.instance().handleSubmit(mockEvent());

            expect(loginUserSpyValid).toHaveBeenCalled();
            loginUserSpyValid.mockReset();
            loginUserSpyValid.mockRestore();

            await expect(props.actions.loginUser).toHaveBeenCalledWith({
                username: 'testUser',
                password: 'password'
            });

            await expect(props.actions.addNotification).toHaveBeenCalled();
            await expect(setToken).toHaveBeenCalled();
            await expect(context.router.history.push).toHaveBeenCalledWith('/');
        });
    });

    describe('with missing login credentials', () => {
        let missingCredentialsLoginWrapper;

        beforeEach(() => {
            missingCredentialsLoginWrapper = shallow(<Login
                handleSubmit={handleSubmitMock}
                handleChange={handleChangeMock}
                {...props}
            />, { context }
            );
        });

        it('does not call the loginUser action if username has not been entered', async () => {
            const loginUserSpyInvalid = jest.spyOn(Login.prototype, 'loginUser');

            await missingCredentialsLoginWrapper.instance().handleSubmit(mockEvent());

            expect(loginUserSpyInvalid).not.toHaveBeenCalled();
        });
    });

    describe('with invalid login credentials', () => {
        let invalidCredentialsLoginWrapper;

        const invalidCredentialsPropsActions = Object.assign({}, props.actions, {
            loginUser: jest.fn(() => (
                Promise.resolve({
                    type: 'ERROR_LOGIN'
                })
            )),
            addNotification: jest.fn(() => (
                Promise.resolve()
            ))
        });

        const invalidCredentialsProps = Object.assign({}, props, {
            actions: invalidCredentialsPropsActions
        });

        beforeEach(() => {
            invalidCredentialsLoginWrapper = shallow(<Login
                handleSubmit={handleSubmitMock}
                handleChange={handleChangeMock}
                {...invalidCredentialsProps}
            />, { context }
            );
        });

        it('calls the loginUser action but redirects to login page if details are invalid', async () => {
            const invalidLoginUserSpyValid = jest.spyOn(Login.prototype, 'loginUser');
            invalidCredentialsLoginWrapper.setState({
                username: 'testUser',
                password: 'incorrectPassword'
            });

            await invalidCredentialsLoginWrapper.instance().handleSubmit(mockEvent());

            expect(invalidLoginUserSpyValid).toHaveBeenCalled();

            await expect(invalidCredentialsProps.actions.loginUser).toHaveBeenCalledWith({
                username: 'testUser',
                password: 'incorrectPassword'
            });

            await expect(invalidCredentialsProps.actions.addNotification).toHaveBeenCalled();

            await expect(context.router.history.push).toHaveBeenCalledWith('/user/login');
        });
    });
});
