const projects = (state = {}, action) => {
    switch (action.type) {
    case 'CREATE_PROJECT':
        return {
            projectName: action.projectName,
            colour: action.colour
        };

    case 'PROJECT_CREATION_SUCCESS':
        return {
            notification: {
                message: `Successfully created project ${action.data.projectName}.`,
                level: 'success',
                title: 'Success'
            },
            success: {
                data: action.data,
            }
        };

    case 'PROJECT_CREATION_ERROR':
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

    case 'PROJECT_UPDATE_SUCCESS':
        return {
            notification: {
                message: `Successfully updated project ${action.data.projectName}.`,
                level: 'success',
                title: 'Success'
            },
            success: {
                data: action.data,
            }
        };

    case 'PROJECT_UPDATE_ERROR':
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

    case 'PROJECT_LIST_RETRIEVED':
        return {
            data: action.data,
            notification: {
                message: 'Projects have been retrieved.',
                level: 'success',
                title: 'Success'
            },
        };

    case 'PROJECT_LIST_ERROR':
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

    case 'SINGLE_PROJECT_RETRIEVED':
        return {
            data: action.data,
            notification: {
                message: 'Single project has been retrieved.',
                level: 'success',
                title: 'Success'
            },
        };

    case 'SINGLE_PROJECT_ERROR':
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

    case 'LIST_PROJECTS':
        return {
            data: action.data
        };

    case 'PROJECT_DELETION_SUCCESS':
        return {
            notification: {
                message: `Successfully deleted project ${action.data.projectName}.`,
                level: 'success',
                title: 'Success'
            },
            success: {
                data: action.data
            }
        };

    case 'PROJECT_DELETION_ERROR':
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

export default projects;
