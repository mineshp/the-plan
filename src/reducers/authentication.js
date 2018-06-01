import isEmpty from 'lodash.isempty';

const initialState = {
    isAuthenticated: false,
    user: {
        username: null
    }
};

const authentication = (state = initialState, action) => {
    switch (action.type) {
    case 'SUCCESS_USER_REGISTERED':
        return Object.assign({}, state, {
            notification: {
                message: `Successfully registered user ${action.data.username}.`,
                level: 'success',
                title: 'Success'
            },
            success: {
                data: action.data
            }
        });

    case 'ERROR_USER_REGISTERED':
        return Object.assign({}, state, {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            error: {
                isError: true
            }
        });

    case 'SUCCESS_LOGIN':
        return Object.assign({}, state, {
            notification: {
                message: `Successfully logged in with user ${action.user.username}.`,
                level: 'success',
                title: 'Success'
            },
            user: action.user,
            token: action.token
        });

    case 'ERROR_LOGIN':
        return Object.assign({}, state, {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            error: {
                isError: true
            }
        });

    case 'SUCCESS_SETTING_PROFILES':
        return Object.assign({}, state, {
            notification: {
                message: 'Successfully set profiles to be displayed',
                level: 'success',
                title: 'Success'
            },
            profilesToDisplay: action.profilesToDisplay
        });

    case 'ERROR_SETTING_PROFILES':
        return Object.assign({}, state, {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            error: {
                isError: true
            }
        });

    case 'SUCCESS_GETTING_USER':
        return Object.assign({}, state, {
            notification: {
                message: 'Successfully retrieved updated user',
                level: 'success',
                title: 'Success'
            },
            user: action.user
        });

    case 'ERROR_GETTING_USER':
        return Object.assign({}, state, {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            error: {
                isError: true
            }
        });


    case 'SET_CURRENT_USER':
        return Object.assign({}, state, {
            isAuthenticated: !isEmpty(action.user),
            user: action.user
        });

    default:
        return state;
    }
};

export default authentication;
