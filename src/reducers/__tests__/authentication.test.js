import authentication from '../authentication';

describe('authentication reducer', () => {
    describe('REGISTER ACTIONS', () => {
        it('should handle initial state', () => {
            expect(authentication(undefined, {})).toEqual(
                {
                    isAuthenticated: false,
                    user: {
                        username: null
                    }
                }
            );
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
                user: {
                    username: 'testUser'
                },
                token: 'asecrettokenonlyforyou'
            })).toEqual({
                notification: {
                    message: 'Successfully logged in with user testUser.',
                    level: 'success',
                    title: 'Success'
                },
                user: {
                    username: 'testUser'
                },
                token: 'asecrettokenonlyforyou'
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

    describe('SET_CURRENT_USER ACTIONS', () => {
        it('should handle SET_CURRENT_USER', () => {
            expect(authentication({}, {
                type: 'SET_CURRENT_USER',
                user: {
                    username: 'testUser'
                }
            })).toEqual({
                isAuthenticated: true,
                user: {
                    username: 'testUser'
                }
            });
        });
    });
});
