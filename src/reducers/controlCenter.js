const initialState = {
    controlCenter: {}
};

const controlCenter = (state = initialState, action) => {
    switch (action.type) {
    case 'USERS_RETRIEVED':
        return {
            controlCenter: {
                users: action.data
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
            error: {
                isError: true
            }
        };

    default:
        return state;
    }
};

export default controlCenter;
