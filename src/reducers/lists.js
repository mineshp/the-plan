const lists = (state = {}, action) => {
    switch (action.type) {
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
