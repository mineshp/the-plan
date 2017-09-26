const projects = (state = {}, action) => {
    switch (action.type) {
    case 'CREATE_PROJECT':
        return {
            projectName: action.projectName,
            colour: action.colour,
            shouldRedirect: false
        };

    case 'PROJECT_CREATION_SUCCESS':
        return {
            success: {
                data: action.data,
                message: 'Successfully created project'
            },
            shouldRedirect: true
        };

    case 'PROJECT_CREATION_ERROR':
        return {
            error: {
                message: action.error,
                isError: true
            },
            shouldRedirect: false
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
