const authentication = (state = {}, action) => {
    switch (action.type) {
    case 'SUCCESS_USER_REGISTERED':
        return {
            notification: {
                message: `Successfully registered user ${action.data.username}.`,
                level: 'success',
                title: 'Success'
            },
            success: {
                data: action.data
            }
        };

    case 'ERROR_USER_REGISTERED':
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

export default authentication;
