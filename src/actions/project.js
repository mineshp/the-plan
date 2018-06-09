import setAuthorisationToken from '../utils/setAuthorisationToken';
import Auth from '../HOC/Authentication/Auth';

const auth = new Auth();

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

export function listAllProjects() {
    const token = auth.getToken();
    return (dispatch) =>
        fetch('/api/project/all', {
            headers: setAuthorisationToken(token)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error('Unable to retrieve projects, please try again later.'));
            })
            .then((data) => dispatch(successListingProjects(data)))
            .catch((error) => dispatch(errorListingProjects(error.message)));
}

export function listProjects() {
    const token = auth.getToken();
    return (dispatch) =>
        fetch('/api/project/byProfiles', {
            headers: setAuthorisationToken(token)
        })
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
    const token = auth.getToken();
    return (dispatch) =>
        fetch('/api/project/update', {
            method: 'post',
            headers: setAuthorisationToken(token),
            body: JSON.stringify({
                projectName: newProject.projectName.toLowerCase(),
                projectDescription: newProject.projectDescription,
                colour: newProject.colour.toLowerCase(),
                profilesAssigned: newProject.profilesAssigned,
                owner: newProject.owner
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
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/project/update/${existingProject._id}`, { // eslint-disable-line no-underscore-dangle
            method: 'post',
            headers: setAuthorisationToken(token),
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
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/project/${projectId}`, {
            headers: setAuthorisationToken(token)
        })
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
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/project/delete/${id}`, {
            method: 'delete',
            headers: setAuthorisationToken(token)
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
