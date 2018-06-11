import setAuthorisationToken from '../utils/setAuthorisationToken';
import Auth from '../HOC/Authentication/Auth';

const auth = new Auth();

export const successRegisteringUser = (data) => ({
    type: 'SUCCESS_USER_REGISTERED',
    data
});

export const errorRegisteringUser = (error) => ({
    type: 'ERROR_USER_REGISTERED',
    error
});

export function registerUser(registrationData) {
    return (dispatch) =>
        fetch('/api/user/register', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(`Unable to register user ${registrationData.username}, please try again later.`));
            })
            .then((data) => dispatch(successRegisteringUser(data)))
            .catch((error) => dispatch(errorRegisteringUser(error.message)));
}

export const successLogin = ({ user, token }) => ({
    type: 'SUCCESS_LOGIN',
    user,
    token
});

export const errorLogin = (error) => ({
    type: 'ERROR_LOGIN',
    error
});

export function setCurrentUser(user) {
    return {
        type: 'SET_CURRENT_USER',
        user
    };
}

export function successSettingProfilesToDisplay(profilesToDisplay) {
    return {
        type: 'SUCCESS_SETTING_PROFILES',
        profilesToDisplay
    };
}

export const errorSettingProfilesToDisplay = (error) => ({
    type: 'ERROR_SETTING_PROFILES',
    error
});

export function successGettingUser(user) {
    return {
        type: 'SUCCESS_GETTING_USER',
        user
    };
}

export const errorGettingUser = (error) => ({
    type: 'ERROR_GETTING_USER',
    error
});

export function getUser(username) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/user/${username}`, {
            headers: setAuthorisationToken(token),
        })
            .then((res) => {
                if (res.ok) {
                    // console.log('res', res.json());
                    return res.json();
                }
                return Promise.reject(
                    new Error(
                        `Unable to get user ${username}.`
                    ));
            })
            .then((data) => {
                // set cookie
                auth.saveProfileDataForUser(data.profilesToDisplay);

                return dispatch(successGettingUser(data));
            })
            .catch((error) => {
                dispatch(errorGettingUser(error.message));
            });
}

export function setProfilesToDisplay(profilesSelected, user) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/user/${user.id}/setProfiles`, {
            method: 'post',
            headers: setAuthorisationToken(token),
            body: JSON.stringify(profilesSelected)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(
                        'Unable to set profiles to display.'
                    ));
            })
            .then((data) => {
                dispatch(successSettingProfilesToDisplay(data));
                return dispatch(getUser(user.username));
            })
            .catch((error) => dispatch(errorSettingProfilesToDisplay(error.message)));
}

export function loginUser(loginDetails) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch('/api/user/login', {
            method: 'post',
            headers: setAuthorisationToken(token),
            body: JSON.stringify(loginDetails)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(
                        `Unable to login with username ${loginDetails.username}.`
                    ));
            })
            .then((data) => {
                dispatch(setCurrentUser(data.user));
                auth.saveProfileDataForUser(data.user.profilesToDisplay);
                return dispatch(successLogin(data));
            })
            .catch((error) => dispatch(errorLogin(error.message)));
}

export function logout() {
    return (dispatch) => {
        auth.logout();
        // delete headers.Authorization; for future requests
        dispatch(setCurrentUser({}));
    };
}
