const lists = (state = {}, action) => {
    switch (action.type) {
    case 'LIST_CREATION_SUCCESS':
        return {
            notification: {
                message: `Successfully created list ${action.data.listName}.`,
                level: 'success',
                title: 'Success'
            },
            success: {
                data: action.data
            }
        };

    case 'LIST_CREATION_ERROR':
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

    case 'LISTS_RETRIEVED':
        return {
            data: action.data,
            notification: {
                message: 'Lists have been retrieved.',
                level: 'success',
                title: 'Success'
            },
        };

    case 'LISTS_RETRIEVED_ERROR':
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

    case 'LIST_RETRIEVED':
        return {
            notification: {
                message: 'List has been retrieved.',
                level: 'success',
                title: 'Success'
            },
            data: action.data
        };

    case 'LIST_RETRIEVED_ERROR':
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

    case 'LIST_DELETION_SUCCESS':
        return {
            notification: {
                message: `Successfully deleted list ${action.data.listName}.`,
                level: 'success',
                title: 'Success'
            },
            success: {
                data: action.data
            }
        };

    case 'LIST_DELETION_ERROR':
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

export default lists;
