import controlCentre from '../controlCentre';

const initialState = {
    controlCentre: {
        profiles: [],
        users: []
    }
};

describe('controlCentre reducer', () => {
    describe('CONTROL CENTRE STATE SET', () => {
        it('State should be set', () => {
            expect(controlCentre(undefined, {})).toEqual(initialState);
        });
    });

    describe('LIST USERS ACTIONS', () => {
        it('should handle initial state', () => {
            expect(controlCentre(initialState, {})).toEqual(
                {
                    controlCentre: {
                        profiles: [],
                        users: []
                    }
                }
            );
        });

        it('should handle USERS_RETRIEVED', () => {
            expect(controlCentre(initialState, {
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
                controlCentre: {
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
                    ],
                    profiles: []
                }
            });
        });

        it('should handle USERS_RETRIEVED_ERROR', () => {
            expect(controlCentre(initialState, {
                type: 'USERS_RETRIEVED_ERROR',
                error: 'Error retrieveing Users'
            })).toEqual({
                notification: {
                    message: 'Error retrieveing Users',
                    level: 'error',
                    title: 'Error'
                },
                controlCentre: {
                    profiles: [],
                    users: []
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('UPDATE USER ACTIONS', () => {
        it('should handle USER_UPDATE_SUCCESS', () => {
            expect(controlCentre(initialState, {
                type: 'USER_UPDATE_SUCCESS',
                data: {
                    id: '12345',
                    username: 'testUser'
                }
            })).toEqual({
                notification: {
                    message: 'Successfully updated user testUser.',
                    level: 'success',
                    title: 'Success'
                },
                controlCentre: {
                    profiles: [],
                    users: []
                },
                success: {
                    data: {
                        id: '12345',
                        username: 'testUser'
                    }
                }
            });
        });

        it('should handle USER_UPDATE_ERROR', () => {
            expect(controlCentre(initialState, {
                type: 'USER_UPDATE_ERROR',
                error: 'Error updating Users'
            })).toEqual({
                notification: {
                    message: 'Error updating Users',
                    level: 'error',
                    title: 'Error'
                },
                controlCentre: {
                    profiles: [],
                    users: []
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('DELETE ACTIONS', () => {
        it('should handle USER_DELETION_SUCCESS', () => {
            expect(controlCentre(initialState, {
                type: 'USER_DELETION_SUCCESS',
                data: {}
            })).toEqual({
                notification: {
                    message: 'Successfully deleted user.',
                    level: 'success',
                    title: 'Success'
                },
                controlCentre: {
                    profiles: [],
                    users: []
                },
                success: {
                    data: {}
                }
            });
        });

        it('should handle USER_DELETION_ERROR', () => {
            expect(controlCentre(initialState, {
                type: 'USER_DELETION_ERROR',
                error: 'Error deleting user'
            })).toEqual({
                notification: {
                    message: 'Error deleting user',
                    level: 'error',
                    title: 'Error'
                },
                controlCentre: {
                    profiles: [],
                    users: []
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('LIST PROFILES ACTIONS', () => {
        it('should handle PROFILES_RETRIEVED', () => {
            expect(controlCentre(initialState, {
                type: 'PROFILES_RETRIEVED',
                data: [
                    {
                        name: 'WEDDING',
                        isAdmin: true
                    },
                    {
                        name: 'TODO',
                        isAdmin: false
                    }
                ]
            })).toEqual({
                notification: {
                    message: 'Profiles have been retrieved.',
                    level: 'success',
                    title: 'Success'
                },
                controlCentre: {
                    profiles: [
                        {
                            name: 'WEDDING',
                            isAdmin: true
                        },
                        {
                            name: 'TODO',
                            isAdmin: false
                        }
                    ],
                    users: []
                }
            });
        });

        it('should handle PROFILES_RETRIEVED_ERROR', () => {
            expect(controlCentre(initialState, {
                type: 'PROFILES_RETRIEVED_ERROR',
                error: 'Error retrieveing Profiles'
            })).toEqual({
                notification: {
                    message: 'Error retrieveing Profiles',
                    level: 'error',
                    title: 'Error'
                },
                controlCentre: {
                    profiles: [],
                    users: []
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('DELETE ACTIONS FOR PROFILE', () => {
        it('should handle PROFILE_DELETION_SUCCESS', () => {
            expect(controlCentre(initialState, {
                type: 'PROFILE_DELETION_SUCCESS',
                data: {}
            })).toEqual({
                notification: {
                    message: 'Successfully deleted profile.',
                    level: 'success',
                    title: 'Success'
                },
                controlCentre: {
                    profiles: [],
                    users: []
                },
                success: {
                    data: {}
                }
            });
        });

        it('should handle PROFILE_DELETION_ERROR', () => {
            expect(controlCentre(initialState, {
                type: 'PROFILE_DELETION_ERROR',
                error: 'Error deleting profile'
            })).toEqual({
                notification: {
                    message: 'Error deleting profile',
                    level: 'error',
                    title: 'Error'
                },
                controlCentre: {
                    profiles: [],
                    users: []
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('CREATE PROFILE ACTIONS', () => {
        it('should handle CREATE_PROFILE', () => {
            expect(controlCentre(initialState, {
                type: 'CREATE_PROFILE',
                name: 'TEST_PROFILE',
                active: true
            })).toEqual({
                name: 'TEST_PROFILE',
                active: true
            });
        });

        it('should handle PROFILE_CREATION_SUCCESS', () => {
            expect(controlCentre(initialState, {
                type: 'PROFILE_CREATION_SUCCESS',
                data: {
                    _id: '1234',
                    name: 'TEST_PROFILE',
                    active: true
                }
            })).toEqual({
                notification: {
                    message: 'Successfully created profile TEST_PROFILE.',
                    level: 'success',
                    title: 'Success'
                },
                controlCentre: {
                    profiles: [],
                    users: []
                },
                success: {
                    data: {
                        _id: '1234',
                        name: 'TEST_PROFILE',
                        active: true
                    }
                }
            });
        });

        it('should handle PROFILE_CREATION_ERROR', () => {
            expect(controlCentre(initialState, {
                type: 'PROFILE_CREATION_ERROR',
                error: 'Error creating profile'
            })).toEqual({
                notification: {
                    message: 'Error creating profile',
                    level: 'error',
                    title: 'Error'
                },
                controlCentre: {
                    profiles: [],
                    users: []
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('UPDATE PROFILE ACTIONS', () => {
        const aProfile = {
            _id: '1234',
            name: 'TEST_PROFILE_2',
            active: false
        };

        it('should handle PROFILE_UPDATE_SUCCESS', () => {
            expect(controlCentre(initialState, {
                type: 'PROFILE_UPDATE_SUCCESS',
                data: aProfile
            })).toEqual({
                notification: {
                    message: 'Successfully updated profile TEST_PROFILE_2.',
                    level: 'success',
                    title: 'Success'
                },
                controlCentre: {
                    profiles: [],
                    users: []
                },
                success: {
                    data: aProfile
                }
            });
        });

        it('should handle PROFILE_UPDATE_ERROR', () => {
            expect(controlCentre(initialState, {
                type: 'PROFILE_UPDATE_ERROR',
                error: 'Unable to update profile, please try again later.'
            })).toEqual({
                notification: {
                    message: 'Unable to update profile, please try again later.',
                    level: 'error',
                    title: 'Error'
                },
                controlCentre: {
                    profiles: [],
                    users: []
                },
                error: {
                    isError: true
                }
            });
        });
    });
});
