import controlCenter from '../controlCenter';

describe('controlCenter reducer', () => {
    describe('LIST USERS ACTIONS', () => {
        it('should handle initial state', () => {
            expect(controlCenter(undefined, {})).toEqual(
                {
                    users: []
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
});
