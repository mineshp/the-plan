import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../Register';
import { mockRegisterUser } from '../../../helpers/test/testData/authenticationData';
import mockEvent from '../../../helpers/test/testData';

const handleSubmitMock = jest.fn();
const handleChangeMock = jest.fn();

const props = {
    actions: {
        registerUser: jest.fn(() => (
            Promise.resolve()
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

describe('Register User', () => {
    describe('with valid user details', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<Register
                {...props}
                handleSubmit={handleSubmitMock}
                handleChange={handleChangeMock}
            />, { context }
            );

            props.actions.registerUser.mockClear();
            props.actions.addNotification.mockClear();
        });

        it('does not call the registerUser action if form is not valid', () => {
            const registerUserSpyInvalid = jest.spyOn(Register.prototype, 'registerUser');
            wrapper.setState({
                formValid: false
            });

            wrapper.instance().handleSubmit(mockEvent());

            expect(registerUserSpyInvalid).not.toHaveBeenCalled();
            registerUserSpyInvalid.mockReset();
            registerUserSpyInvalid.mockRestore();
        });

        it('does call the registerUser action if form is valid', () => {
            const registerUserSpyValid = jest.spyOn(Register.prototype, 'registerUser');
            wrapper.setState({
                formValid: true
            });

            wrapper.instance().handleSubmit(mockEvent());

            expect(registerUserSpyValid).toHaveBeenCalled();
            registerUserSpyValid.mockReset();
            registerUserSpyValid.mockRestore();
        });

        it('calls registerUser action with correct data when handleSubmit is called but no changes have been made', async () => {
            wrapper.setState(Object.assign({}, mockRegisterUser(), {
                formValid: true
            }));

            wrapper.instance().handleSubmit(mockEvent());

            await expect(props.actions.registerUser).toHaveBeenCalledWith({
                email: 'test@mytestemail.com',
                username: 'testUser',
                password: 'password123'
            });

            await expect(props.actions.addNotification).toHaveBeenCalled();
        });

        describe('Input validation', () => {
            describe('success for', () => {
                it('email input is valid email address', () => {
                    const emailInputMockEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            name: 'email',
                            value: 'testUser@mytestEmail.com'
                        }
                    };

                    wrapper.instance().handleChange(emailInputMockEvent);
                    expect(wrapper.state().formErrors.email).toEqual('');
                    expect(wrapper.state().emailValid.length).not.toBe(0);
                });

                it('username input', () => {
                    const usernameInputMockEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            name: 'username',
                            value: 'myusername'
                        }
                    };

                    wrapper.instance().handleChange(usernameInputMockEvent);
                    expect(wrapper.state().formErrors.username).toEqual('');
                    expect(wrapper.state().usernameValid).toBe(true);
                });

                it('password input', () => {
                    const passwordInputMockEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            name: 'password',
                            value: 'password12345'
                        }
                    };

                    wrapper.instance().handleChange(passwordInputMockEvent);
                    expect(wrapper.state().formErrors.password).toEqual('');
                    expect(wrapper.state().passwordValid).toBe(true);
                });

                it('confirm password input matches password', () => {
                    wrapper.setState({
                        password: 'password12345'
                    });

                    const passwordInputMockEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            name: 'confirmPassword',
                            value: 'password12345'
                        }
                    };

                    wrapper.instance().handleChange(passwordInputMockEvent);
                    expect(wrapper.state().formErrors.confirmPassword).toEqual('');
                    expect(wrapper.state().confirmPasswordValid).toBe(true);
                });
            });

            describe('failure for', () => {
                it('email input is not valid email address', () => {
                    const emailInputMockEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            name: 'email',
                            value: 'blah'
                        }
                    };

                    wrapper.instance().handleChange(emailInputMockEvent);
                    expect(wrapper.state().formErrors.email).toEqual(' is invalid');
                    expect(wrapper.state().emailValid).toBe(null);
                });

                it('username input is too short', () => {
                    const usernameInputMockEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            name: 'username',
                            value: 'abc'
                        }
                    };

                    wrapper.instance().handleChange(usernameInputMockEvent);
                    expect(wrapper.state().formErrors.username).toEqual(' is too short');
                    expect(wrapper.state().usernameValid).toBe(false);
                });

                it('password input is too short', () => {
                    const passwordInputMockEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            name: 'password',
                            value: '12345'
                        }
                    };

                    wrapper.instance().handleChange(passwordInputMockEvent);
                    expect(wrapper.state().formErrors.password).toEqual(' is too short');
                    expect(wrapper.state().passwordValid).toBe(false);
                });

                it('confirm password input does not match password', () => {
                    wrapper.setState({
                        password: 'password12345'
                    });

                    const passwordInputMockEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            name: 'confirmPassword',
                            value: 'password'
                        }
                    };

                    wrapper.instance().handleChange(passwordInputMockEvent);
                    expect(wrapper.state().formErrors.confirmPassword).toEqual(' does not match');
                    expect(wrapper.state().confirmPasswordValid).toBe(false);
                });

                it('handles an invalid input field sent for validation', () => {
                    const invalidInputMockEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            name: 'invalidField',
                            value: 'password'
                        }
                    };

                    wrapper.instance().handleChange(invalidInputMockEvent);
                    expect(wrapper.state().formErrors).toEqual({
                        email: '',
                        username: '',
                        password: '',
                        confirmPassword: ''
                    });
                    expect(wrapper.state().usernameValid).toBe(false);
                    expect(wrapper.state().emailValid).toBe(false);
                    expect(wrapper.state().passwordValid).toBe(false);
                    expect(wrapper.state().confirmPasswordValid).toBe(undefined);
                });
            });

            describe('Validate Form', () => {
                it('returns true when email, username, password and confirm password are valid', () => {
                    wrapper.setState({
                        emailValid: true,
                        passwordValid: true,
                        confirmPasswordValid: true
                    });

                    const usernameInputMockEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            name: 'username',
                            value: 'testUsername'
                        }
                    };

                    wrapper.instance().handleChange(usernameInputMockEvent);

                    expect(wrapper.state().formValid).toEqual(true);
                });

                it('returns false when at least one of the form fields are invalid', () => {
                    wrapper.setState({
                        emailValid: true,
                        passwordValid: true,
                        confirmPasswordValid: true
                    });

                    const usernameInputMockEvent = {
                        preventDefault: jest.fn(),
                        target: {
                            name: 'username',
                            value: 'abc'
                        }
                    };

                    wrapper.instance().handleChange(usernameInputMockEvent);

                    expect(wrapper.state().formValid).toEqual(false);
                });
            });
        });
    });
});
