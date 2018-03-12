const initialState = {
    users: []
};

const controlCenter = (state = initialState, action) => {
    switch (action.type) {
    case 'USERS_RETRIEVED':
        return {
            users: action.data,
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

    default:
        return state;
    }
};

export default controlCenter;
