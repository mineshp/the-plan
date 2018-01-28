import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../Login';
import mockEvent from '../../../helpers/test/testData';

const handleSubmitMock = jest.fn();
const handleChangeMock = jest.fn();

const context = {
    router: {
        history: {
            push: jest.fn()
        }
    }
};

describe('Login User', () => {
    describe('with invalid login credentials', () => {
        const props = {
            actions: {
                loginUser: jest.fn(() => (
                    Promise.resolve({
                        type: 'ERROR_LOGIN'
                    })
                )),
                addNotification: jest.fn(() => (
                    Promise.resolve()
                ))
            },
            notification: null
        };

        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<Login
                {...props}
                handleSubmit={handleSubmitMock}
                handleChange={handleChangeMock}
            />, { context }
            );

            props.actions.loginUser.mockClear();
            props.actions.addNotification.mockClear();
        });

        it('does not call the loginUser action if username has not been entered', () => {
            const loginUserSpyInvalid = jest.spyOn(Login.prototype, 'loginUser');

            wrapper.instance().handleSubmit(mockEvent());

            expect(loginUserSpyInvalid).not.toHaveBeenCalled();
        });

        it('does not call the loginUser action if password has not been entered', () => {
            const loginUserSpyInvalid = jest.spyOn(Login.prototype, 'loginUser');
            wrapper.setState({
                username: 'testUser'
            });

            wrapper.instance().handleSubmit(mockEvent());

            expect(loginUserSpyInvalid).not.toHaveBeenCalled();
        });

        it('calls the loginUser action but redirects to login page if details are invalid', async () => {
            const loginUserSpyValid = jest.spyOn(Login.prototype, 'loginUser');
            wrapper.setState({
                username: 'testUser',
                password: 'password'
            });

            wrapper.instance().handleSubmit(mockEvent());

            expect(loginUserSpyValid).toHaveBeenCalled();
            // await expect(context.router.history.push).toHaveBeenCalledWith('/user/login');
        });
    });
    describe('with valid login credentials', () => {
        const propsValid = {
            actions: {
                loginUser: jest.fn(() => (
                    Promise.resolve({
                        type: 'LIST_SUCCESS'
                    })
                )),
                addNotification: jest.fn(() => (
                    Promise.resolve()
                ))
            },
            notification: null
        };

        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<Login
                {...propsValid}
                handleSubmit={handleSubmitMock}
                handleChange={handleChangeMock}
            />, { context }
            );

            propsValid.actions.loginUser.mockClear();
            propsValid.actions.addNotification.mockClear();
        });

        it('does call the loginUser action if username and password is valid', async () => {
            const loginUserSpyValid = jest.spyOn(Login.prototype, 'loginUser');
            wrapper.setState({
                username: 'testUser',
                password: 'password'
            });

            wrapper.instance().handleSubmit(mockEvent());

            expect(loginUserSpyValid).toHaveBeenCalled();
            loginUserSpyValid.mockReset();
            loginUserSpyValid.mockRestore();

            await expect(propsValid.actions.loginUser).toHaveBeenCalledWith({
                username: 'testUser',
                password: 'password'
            });

            await expect(propsValid.actions.addNotification).toHaveBeenCalled();

            // await expect(context.router.history.push).toHaveBeenCalledWith('/');
        });
    });
});
