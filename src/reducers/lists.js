const lists = (state = {}, action) => {
    switch (action.type) {
    case 'LIST_CREATION_SUCCESS':
        return {
            success: {
                data: action.data,
                message: `Successfully created list ${action.data.listName}.`
            }
        };

    case 'LIST_CREATION_ERROR':
        return {
            error: {
                message: action.error,
                isError: true
            }
        };

    case 'LISTS_RETRIEVED':
        return {
            data: action.data
        };

    case 'LISTS_RETRIEVED_ERROR':
        return {
            error: {
                message: action.error,
                isError: true
            }
        };

    case 'LIST_RETRIEVED':
        return {
            data: action.data
        };

    case 'LIST_RETRIEVED_ERROR':
        return {
            error: {
                message: action.error,
                isError: true
            }
        };

    default:
        return state;
    }
};

export default lists;
