/* eslint-disable import/first */
jest.mock('../../HOC/Authentication/Auth');
import Auth from '../../HOC/Authentication/Auth';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../controlCentre';
import { mockListUsers, mockListProfiles } from '../../helpers/test/testData/controlCentreData';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockUsers = mockListUsers();
const mockProfiles = mockListProfiles();

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json'
    }
});

describe('Control Centre actions', () => {
    const getToken = jest.fn();
    Auth.mockImplementation(() => ({ getToken }));
    describe('Retrieve Users actions', () => {
        const mockRetrieveUsersSuccessAPIResponse = mockUsers;

        const mockUsersRetrievalFailureAPIResponse = {
            message: 'Unable to retrieve users, please try again later.'
        };

        it('should dispatch an action for USERS_RETRIEVED when calling successRetrievingUsers to confirm users were retrieved', () => {
            const expectedAction = {
                type: 'USERS_RETRIEVED',
                data: mockRetrieveUsersSuccessAPIResponse
            };

            expect(actions.successRetrievingUsers(mockRetrieveUsersSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for USERS_RETRIEVED_ERROR when calling errorRetrievingUsers to notify the user we were unable to retrieve users', () => {
            const expectedAction = {
                type: 'USERS_RETRIEVED_ERROR',
                error: mockUsersRetrievalFailureAPIResponse.message
            };

            expect(actions.errorRetrievingUsers(mockUsersRetrievalFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful retrieveUsers call via the store, dispatches the USERS_RETRIEVED action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockRetrieveUsersSuccessAPIResponse))));

            const store = mockStore({ controlCentre: [] });

            const expectedActions = [
                {
                    type: 'USERS_RETRIEVED',
                    data: mockRetrieveUsersSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.retrieveUsers()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful retrieveUsers call via the store, dispatches the USERS_RETRIEVED_ERROR action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockUsersRetrievalFailureAPIResponse))));

            const store = mockStore({ controlCentre: [] });

            const expectedAction = [
                {
                    type: 'USERS_RETRIEVED_ERROR',
                    error: mockUsersRetrievalFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.retrieveUsers()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Delete Users Actions', () => {
        const userIdToDelete = 1;

        it('should dispatch an action for USER_DELETION_SUCCESS when calling successDeletingUser to confirm a user has been deleted', () => {
            const mockDeleteSuccessAPIResponse = {
                ok: 1,
                n: 1
            };

            const expectedAction = {
                type: 'USER_DELETION_SUCCESS',
                data: mockDeleteSuccessAPIResponse
            };

            expect(actions.successDeletingUser(mockDeleteSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for USER_DELETION_ERROR when calling errorDeletingUser to notify the user a user has failed to be deleted', () => {
            const mockListDeletetionFailureAPIResponse = {
                message: 'Error deleting user'
            };

            const expectedAction = {
                type: 'USER_DELETION_ERROR',
                error: mockListDeletetionFailureAPIResponse.message
            };

            expect(actions.errorDeletingUser(mockListDeletetionFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful deleteUser call via the store, dispatches the LIST_DELETION_SUCCESS action', async () => {
            const mockDeleteSuccessAPIResponse = {
                ok: 1,
                n: 1
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockDeleteSuccessAPIResponse))));

            const store = mockStore({ controlCentre: [] });

            const expectedActions = [
                {
                    type: 'USER_DELETION_SUCCESS',
                    data: mockDeleteSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.deleteUser(userIdToDelete)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful deleteUser call via the store, dispatches the USER_DELETION_ERROR action', async () => {
            const mockListDeletetionFailureAPIResponse = {
                message: 'Error deleting user, please try again later.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockListDeletetionFailureAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedAction = [
                {
                    type: 'USER_DELETION_ERROR',
                    error: mockListDeletetionFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.deleteUser(userIdToDelete)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Retrieve Profiles actions', () => {
        const mockRetrieveProfilesSuccessAPIResponse = mockProfiles;

        const mockProfilesRetrievalFailureAPIResponse = {
            message: 'Unable to retrieve profiles, please try again later.'
        };

        it('should dispatch an action for PROFILES_RETRIEVED when calling successRetrievingProfiles to confirm profiles were retrieved', () => {
            const expectedAction = {
                type: 'PROFILES_RETRIEVED',
                data: mockRetrieveProfilesSuccessAPIResponse
            };

            expect(actions.successRetrievingProfiles(mockRetrieveProfilesSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for PROFILE_RETRIEVED_ERROR when calling errorRetrievingProfiles to notify the user we were unable to retrieve profiles', () => {
            const expectedAction = {
                type: 'PROFILES_RETRIEVED_ERROR',
                error: mockProfilesRetrievalFailureAPIResponse.message
            };

            expect(actions.errorRetrievingProfiles(mockProfilesRetrievalFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful retrieveProfiles call via the store, dispatches the PROFILES_RETRIEVED action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockRetrieveProfilesSuccessAPIResponse))));

            const store = mockStore({ controlCentre: [] });

            const expectedActions = [
                {
                    type: 'PROFILES_RETRIEVED',
                    data: mockRetrieveProfilesSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.retrieveProfiles()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful retrieveProfiles call via the store, dispatches the PROFILES_RETRIEVED_ERROR action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockProfilesRetrievalFailureAPIResponse))));

            const store = mockStore({ controlCentre: [] });

            const expectedAction = [
                {
                    type: 'PROFILES_RETRIEVED_ERROR',
                    error: mockProfilesRetrievalFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.retrieveProfiles()).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Delete Profiles Actions', () => {
        const profileIdToDelete = 1;

        it('should dispatch an action for PROFILE_DELETION_SUCCESS when calling successDeletingProfile to confirm a profile has been deleted', () => {
            const mockDeleteSuccessAPIResponse = {
                ok: 1,
                n: 1
            };

            const expectedAction = {
                type: 'PROFILE_DELETION_SUCCESS',
                data: mockDeleteSuccessAPIResponse
            };

            expect(actions.successDeletingProfile(mockDeleteSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for PROFILE_DELETION_ERROR when calling errorDeletingUser to notify the user a user has failed to be deleted', () => {
            const mockProfileDeletetionFailureAPIResponse = {
                message: 'Error deleting profile'
            };

            const expectedAction = {
                type: 'PROFILE_DELETION_ERROR',
                error: mockProfileDeletetionFailureAPIResponse.message
            };

            expect(actions.errorDeletingProfile(mockProfileDeletetionFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful deleteProfile call via the store, dispatches the PROFILE_DELETION_SUCCESS action', async () => {
            const mockDeleteSuccessAPIResponse = {
                ok: 1,
                n: 1
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockDeleteSuccessAPIResponse))));

            const store = mockStore({ controlCentre: [] });

            const expectedActions = [
                {
                    type: 'PROFILE_DELETION_SUCCESS',
                    data: mockDeleteSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.deleteProfile(profileIdToDelete)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful deleteProfile call via the store, dispatches the PROFILE_DELETION_ERROR action', async () => {
            const mockProfileDeletetionFailureAPIResponse = {
                message: 'Error deleting profile, please try again later.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockProfileDeletetionFailureAPIResponse))));

            const store = mockStore({ lists: [] });

            const expectedAction = [
                {
                    type: 'PROFILE_DELETION_ERROR',
                    error: mockProfileDeletetionFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.deleteProfile(profileIdToDelete)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Create Profile Actions', () => {
        it('should dispatch an action for PROFILE_CREATION_SUCCESS when calling createdProfile to notify the user a profile has been created', () => {
            const mockNewProfileCreationSuccessAPIResponse = {
                _id: '1234',
                name: 'TEST_PROFILE',
                active: true
            };

            const expectedAction = {
                type: 'PROFILE_CREATION_SUCCESS',
                data: mockNewProfileCreationSuccessAPIResponse
            };

            expect(actions.createdProfile(mockNewProfileCreationSuccessAPIResponse)).toEqual(expectedAction);
        });

        it('should dispatch an action for PROFILE_CREATION_ERROR when calling create to notify the user there was an error creating the profile', () => {
            const mockNewProfileCreationFailureAPIResponse = {
                message: 'Error creating profile'
            };

            const expectedAction = {
                type: 'PROFILE_CREATION_ERROR',
                error: mockNewProfileCreationFailureAPIResponse.message
            };

            expect(actions.errorCreatingProfile(mockNewProfileCreationFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful create profile call via the store, dispatches the PROFILE_CREATION_SUCCESS action', async () => {
            const mockNewProfileCreationSuccessAPIResponse = {
                _id: '1234',
                name: 'TEST_PROFILE',
                active: true
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockNewProfileCreationSuccessAPIResponse))));


            const store = mockStore({ lists: [] });
            const newProfileData = {
                name: 'TEST_PROFILE',
                active: true
            };

            const expectedActions = [
                {
                    type: 'PROFILE_CREATION_SUCCESS',
                    data: mockNewProfileCreationSuccessAPIResponse
                }
            ];

            return store.dispatch(actions.create(newProfileData)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful create profile call via the store, dispatches the PROFILE_CREATION_ERROR action', async () => {
            const mockNewProfileCreationFailureAPIResponse = {
                message: 'Error creating profile TEST_PROFILE, profile already exists.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(403, null, JSON.stringify(mockNewProfileCreationFailureAPIResponse))));


            const store = mockStore({ lists: {} });
            const newProfileData = {
                name: 'TEST_PROFILE',
                active: true
            };

            const expectedAction = [
                {
                    type: 'PROFILE_CREATION_ERROR',
                    error: mockNewProfileCreationFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.create(newProfileData)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Update Profile Actions', () => {
        const profileToUpdate = {
            _id: '1234',
            name: 'TEST_PROFILE',
            active: 'true'
        };

        it('should dispatch an action for PROFILE_UPDATE_SUCCESS when calling updatedProfile to confirm a profile has been updated', () => {
            const expectedAction = {
                type: 'PROFILE_UPDATE_SUCCESS',
                data: profileToUpdate
            };

            expect(actions.updatedProfile(profileToUpdate)).toEqual(expectedAction);
        });

        it('should dispatch an action for PROFILE_UPDATE_ERROR when calling errorUpdatingProfile to notify the user a profile has failed to be updated', () => {
            const mockProfileUpdateFailureAPIResponse = {
                message: 'Error updating profile'
            };

            const expectedAction = {
                type: 'PROFILE_UPDATE_ERROR',
                error: mockProfileUpdateFailureAPIResponse.message
            };

            expect(actions.errorUpdatingProfile(mockProfileUpdateFailureAPIResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful update call via the store, dispatches the PROFILE_UPDATE_SUCCESS action', async () => {
            const profileToUpdateV2 = {
                _id: '1234',
                name: 'TEST_PROFILE_2',
                active: true
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(profileToUpdateV2))));

            const store = mockStore({});

            const expectedActions = [
                {
                    type: 'PROFILE_UPDATE_SUCCESS',
                    data: profileToUpdateV2
                }
            ];

            return store.dispatch(actions.update(profileToUpdateV2)).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful update call via the store, dispatches the PROFILE_UPDATE_ERROR action', async () => {
            const mockProfileUpdateFailureAPIResponse = {
                message: 'Error updating profile oldName, please try again later.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockProfileUpdateFailureAPIResponse))));

            const store = mockStore({
                _id: '123',
                name: 'TEST_PROFILE'
            });

            const expectedAction = [
                {
                    type: 'PROFILE_UPDATE_ERROR',
                    error: mockProfileUpdateFailureAPIResponse.message
                }
            ];

            return store.dispatch(actions.update({
                name: 'oldName'
            })).then(() => {
                // return of async actions
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });
});
