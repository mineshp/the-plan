const projects = (state = {}, action) => {
    switch (action.type) {
    case 'CREATE_PROJECT':
        return {
            projectName: action.projectName,
            colour: action.colour
        };

    case 'PROJECT_CREATION_SUCCESS':
        return {
            success: {
                data: action.data,
                message: `Successfully created project ${action.data.projectName}.`
            }
        };

    case 'PROJECT_CREATION_ERROR':
        return {
            error: {
                message: action.error,
                isError: true
            }
        };

    case 'PROJECT_UPDATE_SUCCESS':
        return {
            success: {
                data: action.data,
                message: `Successfully updated project ${action.data.projectName}.`
            }
        };

    case 'PROJECT_UPDATE_ERROR':
        return {
            error: {
                message: action.error,
                isError: true
            }
        };

    case 'PROJECT_LIST_RETRIEVED':
        return {
            data: action.data
        };

    case 'PROJECT_LIST_ERROR':
        return {
            error: {
                message: action.error,
                isError: true
            }
        };

    case 'SINGLE_PROJECT_RETRIEVED':
        return {
            data: action.data
        };

    case 'SINGLE_PROJECT_ERROR':
        return {
            error: {
                message: action.error,
                isError: true
            }
        };

    case 'LIST_PROJECTS':
        return {
            data: action.data
        };

    case 'PROJECT_DELETION_SUCCESS':
        return {
            success: {
                data: action.data,
                message: `Successfully deleted project ${action.data.projectName}`
            }
        };

    case 'PROJECT_DELETION_ERROR':
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

export default projects;
