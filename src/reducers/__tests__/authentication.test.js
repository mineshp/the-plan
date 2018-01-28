import authentication from '../authentication';

describe('authentication reducer', () => {
    describe('REGISTER ACTIONS', () => {
        it('should handle initial state', () => {
            expect(authentication(undefined, {})).toEqual({});
        });

        it('should handle SUCCESS_USER_REGISTERED', () => {
            expect(authentication({}, {
                type: 'SUCCESS_USER_REGISTERED',
                data: {
                    email: 'test@test.com',
                    username: 'testUser',
                    password: 'password123',
                    confirmPassword: 'password123'
                }
            })).toEqual({
                notification: {
                    message: 'Successfully registered user testUser.',
                    level: 'success',
                    title: 'Success'
                },
                success: {
                    data: {
                        email: 'test@test.com',
                        username: 'testUser',
                        password: 'password123',
                        confirmPassword: 'password123'
                    }
                }
            });
        });

        it('should handle ERROR_USER_REGISTERED', () => {
            expect(authentication({}, {
                type: 'ERROR_USER_REGISTERED',
                error: 'Error registering User'
            })).toEqual({
                notification: {
                    message: 'Error registering User',
                    level: 'error',
                    title: 'Error'
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('LOGIN ACTIONS', () => {
        it('should handle SUCCESS_LOGIN', () => {
            expect(authentication({}, {
                type: 'SUCCESS_LOGIN',
                data: {
                    email: 'test@test.com',
                    username: 'testUser',
                    password: 'password123'
                }
            })).toEqual({
                notification: {
                    message: 'Successfully logged in with user testUser.',
                    level: 'success',
                    title: 'Success'
                },
                success: {
                    data: {
                        email: 'test@test.com',
                        username: 'testUser',
                        password: 'password123',
                    }
                }
            });
        });

        it('should handle ERROR_LOGIN', () => {
            expect(authentication({}, {
                type: 'ERROR_LOGIN',
                error: 'Error logging in'
            })).toEqual({
                notification: {
                    message: 'Error logging in',
                    level: 'error',
                    title: 'Error'
                },
                error: {
                    isError: true
                }
            });
        });
    });
});
