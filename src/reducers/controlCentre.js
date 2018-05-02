const initialState = {
    controlCentre: {
        users: [],
        profiles: []
    }
};

const controlCentre = (state = initialState, action) => {
    switch (action.type) {
    case 'USERS_RETRIEVED':
        return {
            controlCentre: {
                users: action.data,
                profiles: state.controlCentre.profiles
            },
            notification: {
                message: 'Users have been retrieved.',
                level: 'success',
                title: 'Success'
            },
        };

    case 'USERS_RETRIEVED_ERROR':
        return {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            controlCentre: {
                users: state.controlCentre.users,
                profiles: state.controlCentre.profiles
            },
            error: {
                isError: true
            }
        };

    case 'USER_DELETION_SUCCESS':
        return {
            notification: {
                message: 'Successfully deleted user.',
                level: 'success',
                title: 'Success'
            },
            controlCentre: {
                users: state.controlCentre.users,
                profiles: state.controlCentre.profiles
            },
            success: {
                data: action.data
            }
        };

    case 'USER_DELETION_ERROR':
        return {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            controlCentre: {
                users: state.controlCentre.users,
                profiles: state.controlCentre.profiles
            },
            error: {
                isError: true
            }
        };

    case 'USER_UPDATE_SUCCESS':
        return {
            notification: {
                message: `Successfully updated user ${action.data.username}.`,
                level: 'success',
                title: 'Success'
            },
            controlCentre: {
                users: state.controlCentre.users,
                profiles: state.controlCentre.profiles
            },
            success: {
                data: action.data,
            }
        };

    case 'USER_UPDATE_ERROR':
        return {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            controlCentre: {
                users: state.controlCentre.users,
                profiles: state.controlCentre.profiles
            },
            error: {
                isError: true
            }
        };

    case 'PROFILES_RETRIEVED':
        return {
            controlCentre: {
                users: state.controlCentre.users,
                profiles: action.data
            },
            notification: {
                message: 'Profiles have been retrieved.',
                level: 'success',
                title: 'Success'
            },
        };

    case 'PROFILES_RETRIEVED_ERROR':
        return {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            controlCentre: {
                users: state.controlCentre.users,
                profiles: state.controlCentre.profiles
            },
            error: {
                isError: true
            }
        };

    case 'PROFILE_DELETION_SUCCESS':
        return {
            notification: {
                message: 'Successfully deleted profile.',
                level: 'success',
                title: 'Success'
            },
            controlCentre: {
                users: state.controlCentre.users,
                profiles: state.controlCentre.profiles
            },
            success: {
                data: action.data
            }
        };

    case 'PROFILE_DELETION_ERROR':
        return {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            controlCentre: {
                users: state.controlCentre.users,
                profiles: state.controlCentre.profiles
            },
            error: {
                isError: true
            }
        };

    case 'CREATE_PROFILE':
        return {
            name: action.name,
            active: action.active
        };

    case 'PROFILE_CREATION_SUCCESS':
        return {
            notification: {
                message: `Successfully created profile ${action.data.name}.`,
                level: 'success',
                title: 'Success'
            },
            controlCentre: {
                users: state.controlCentre.users,
                profiles: state.controlCentre.profiles
            },
            success: {
                data: action.data,
            }
        };

    case 'PROFILE_CREATION_ERROR':
        return {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            controlCentre: {
                users: state.controlCentre.users,
                profiles: state.controlCentre.profiles
            },
            error: {
                isError: true
            }
        };

    case 'PROFILE_UPDATE_SUCCESS':
        return {
            notification: {
                message: `Successfully updated profile ${action.data.name}.`,
                level: 'success',
                title: 'Success'
            },
            controlCentre: {
                users: state.controlCentre.users,
                profiles: state.controlCentre.profiles
            },
            success: {
                data: action.data,
            }
        };

    case 'PROFILE_UPDATE_ERROR':
        return {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            controlCentre: {
                users: state.controlCentre.users,
                profiles: state.controlCentre.profiles
            },
            error: {
                isError: true
            }
        };

    default:
        return state;
    }
};

export default controlCentre;
