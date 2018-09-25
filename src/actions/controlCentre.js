import setAuthorisationToken from '../utils/setAuthorisationToken';
import Auth from '../HOC/Authentication/Auth';
import { setProfilesToDisplay } from './authentication';

const auth = new Auth();

export const successRetrievingUsers = (data) => ({
    type: 'USERS_RETRIEVED',
    data
});

export const errorRetrievingUsers = (error) => ({
    type: 'USERS_RETRIEVED_ERROR',
    error
});

export function retrieveUsers() {
    const token = auth.getToken();
    return (dispatch) =>
        fetch('/api/admin/manage/users', {
            headers: setAuthorisationToken(token)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error('Unable to retrieve users, please try again later.'));
            })
            .then((data) => dispatch(successRetrievingUsers(data)))
            .catch((error) => dispatch(errorRetrievingUsers(error.message)));
}

export const successDeletingUser = (data) => ({
    type: 'USER_DELETION_SUCCESS',
    data
});

export const errorDeletingUser = (error) => ({
    type: 'USER_DELETION_ERROR',
    error
});

export function deleteUser(id) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/admin/manage/users/delete/${id}`, {
            method: 'delete',
            headers: setAuthorisationToken(token)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error('Error deleting user, please try again later.'));
            })
            .then((data) => dispatch(successDeletingUser(data)))
            .catch((error) => dispatch(errorDeletingUser(error.message)));
}

export const successUpdatingUser = (data) => ({
    type: 'USER_UPDATE_SUCCESS',
    data
});

export const errorUpdatingUser = (error) => ({
    type: 'USER_UPDATE_ERROR',
    error
});

export function updateUser(existingUser) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/admin/manage/users/update/${existingUser.id}`, {
            method: 'post',
            headers: setAuthorisationToken(token),
            body: JSON.stringify(existingUser)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(`Error updating user ${existingUser.username}, please try again later.`));
            })
            .then((data) => {
                auth.saveProfileDataForUser();
                dispatch(setProfilesToDisplay(existingUser.profile, existingUser));
                dispatch(successUpdatingUser(data));
            })
            .catch((error) => dispatch(errorUpdatingUser(error.message)));
}


export const successRetrievingProfiles = (data) => ({
    type: 'PROFILES_RETRIEVED',
    data
});

export const errorRetrievingProfiles = (error) => ({
    type: 'PROFILES_RETRIEVED_ERROR',
    error
});

export function retrieveProfiles() {
    const token = auth.getToken();
    return (dispatch) =>
        fetch('/api/admin/manage/profiles', {
            headers: setAuthorisationToken(token)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error('Unable to retrieve profiles, please try again later.'));
            })
            .then((data) => dispatch(successRetrievingProfiles(data)))
            .catch((error) => dispatch(errorRetrievingProfiles(error.message)));
}

export const successDeletingProfile = (data) => ({
    type: 'PROFILE_DELETION_SUCCESS',
    data
});

export const errorDeletingProfile = (error) => ({
    type: 'PROFILE_DELETION_ERROR',
    error
});

export function deleteProfile(id) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/admin/manage/profiles/delete/${id}`, {
            method: 'delete',
            headers: setAuthorisationToken(token)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error('Error deleting profile, please try again later.'));
            })
            .then((data) => dispatch(successDeletingProfile(data)))
            .catch((error) => dispatch(errorDeletingProfile(error.message)));
}

export const createdProfile = (data) => ({
    type: 'PROFILE_CREATION_SUCCESS',
    data
});

export const errorCreatingProfile = (error) => ({
    type: 'PROFILE_CREATION_ERROR',
    error
});

export function create(newProfile) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch('/api/admin/manage/profiles/update', {
            method: 'post',
            headers: setAuthorisationToken(token),
            body: JSON.stringify({
                name: newProfile.name,
                active: newProfile.active
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(`Error creating profile ${newProfile.name}, profile already exists.`));
            })
            .then((data) => dispatch(createdProfile(data)))
            .catch((error) => dispatch(errorCreatingProfile(error.message)));
}

export const updatedProfile = (data) => ({
    type: 'PROFILE_UPDATE_SUCCESS',
    data
});

export const errorUpdatingProfile = (error) => ({
    type: 'PROFILE_UPDATE_ERROR',
    error
});

export function update(existingProfile) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/admin/manage/profiles/update/${existingProfile._id}`, { // eslint-disable-line no-underscore-dangle
            method: 'post',
            headers: setAuthorisationToken(token),
            body: JSON.stringify(existingProfile)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(`Error updating profile ${existingProfile.name}, please try again later.`));
            })
            .then((data) => dispatch(updatedProfile(data)))
            .catch((error) => dispatch(errorUpdatingProfile(error.message)));
}
