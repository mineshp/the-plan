
export const createProject = (projectName, colour) => ({
    type: 'CREATE_PROJECT',
    projectName,
    colour
});

export const createdProject = (data) => ({
    type: 'PROJECT_CREATION_SUCCESS',
    data
});

export const errorCreatingProject = (error) => ({
    type: 'PROJECT_CREATION_ERROR',
    error
});

export const updatedProject = (data) => ({
    type: 'PROJECT_UPDATE_SUCCESS',
    data
});

export const errorUpdatingProject = (error) => ({
    type: 'PROJECT_UPDATE_ERROR',
    error
});

export const successListingProjects = (data) => ({
    type: 'PROJECT_LIST_RETRIEVED',
    data
});

export const errorListingProjects = (error) => ({
    type: 'PROJECT_LIST_ERROR',
    error
});

export const successFetchingProject = (data) => ({
    type: 'SINGLE_PROJECT_RETRIEVED',
    data
});

export const errorFetchingProject = (error) => ({
    type: 'SINGLE_PROJECT_ERROR',
    error
});

export function listProjects() {
    return (dispatch) =>
        fetch('/project/all')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error('Unable to retrieve projects, please try again later.'));
            })
            .then((data) => dispatch(successListingProjects(data)))
            .catch((error) => dispatch(errorListingProjects(error.message)));
}

export function create(newProject) {
    return (dispatch) =>
        fetch('/project/update', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                projectName: newProject.projectName,
                colour: newProject.colour.toLowerCase()
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(`Error creating project ${newProject.projectName}, project already exists.`));
            })
            .then((data) => dispatch(createdProject(data)))
            .catch((error) => dispatch(errorCreatingProject(error.message)));
}

export function update(existingProject) {
    return (dispatch) =>
        fetch(`/project/update/${existingProject._id}`, { // eslint-disable-line no-underscore-dangle
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(existingProject)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(`Error updating project ${existingProject.projectName}, please try again later.`));
            })
            .then((data) => dispatch(updatedProject(data)))
            .catch((error) => dispatch(errorUpdatingProject(error.message)));
}

export function fetchSingleProject(projectId) {
    return (dispatch) =>
        fetch(`/project/${projectId}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(`Unable to retrieve project with id ${projectId}, please try again later.`));
            })
            .then((data) => dispatch(successFetchingProject(data)))
            .catch((error) => dispatch(errorFetchingProject(error.message)));
}

export const deletedProject = (data) => ({
    type: 'PROJECT_DELETION_SUCCESS',
    data
});

export const errorDeletingProject = (error) => ({
    type: 'PROJECT_DELETION_ERROR',
    error
});

export function deleteProject(id) {
    return (dispatch) =>
        fetch(`/project/delete/${id}`, {
            method: 'delete',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error('Error deleting project, please try again later.'));
            })
            .then((data) => dispatch(deletedProject(data)))
            .catch((error) => dispatch(errorDeletingProject(error.message)));
}
