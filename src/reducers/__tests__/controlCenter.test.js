import controlCenter from '../controlCenter';

describe('controlCenter reducer', () => {
    describe('LIST USERS ACTIONS', () => {
        it('should handle initial state', () => {
            expect(controlCenter(undefined, {})).toEqual(
                {
                    controlCenter: {}
                }
            );
        });

        it('should handle USERS_RETRIEVED', () => {
            expect(controlCenter({}, {
                type: 'USERS_RETRIEVED',
                data: [
                    {
                        email: 'test@test.com',
                        username: 'testUser',
                        isAdmin: true
                    },
                    {
                        email: 'test@test2.com',
                        username: 'testUserXYZ',
                        isAdmin: false
                    }
                ]
            })).toEqual({
                notification: {
                    message: 'Users have been retrieved.',
                    level: 'success',
                    title: 'Success'
                },
                controlCenter: {
                    users: [
                        {
                            email: 'test@test.com',
                            username: 'testUser',
                            isAdmin: true
                        },
                        {
                            email: 'test@test2.com',
                            username: 'testUserXYZ',
                            isAdmin: false
                        }
                    ]
                }
            });
        });

        it('should handle USERS_RETRIEVED_ERROR', () => {
            expect(controlCenter({}, {
                type: 'USERS_RETRIEVED_ERROR',
                error: 'Error retrieveing Users'
            })).toEqual({
                notification: {
                    message: 'Error retrieveing Users',
                    level: 'error',
                    title: 'Error'
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('DELETE ACTIONS', () => {
        it('should handle USER_DELETION_SUCCESS', () => {
            expect(controlCenter({}, {
                type: 'USER_DELETION_SUCCESS',
                data: {}
            })).toEqual({
                notification: {
                    message: 'Successfully deleted user.',
                    level: 'success',
                    title: 'Success'
                },
                success: {
                    data: {}
                }
            });
        });

        it('should handle USER_DELETION_ERROR', () => {
            expect(controlCenter({}, {
                type: 'USER_DELETION_ERROR',
                error: 'Error deleting user'
            })).toEqual({
                notification: {
                    message: 'Error deleting user',
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
