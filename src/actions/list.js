import setAuthorisationToken from '../utils/setAuthorisationToken';
import Auth from '../HOC/Authentication/Auth';

const auth = new Auth();

export const createdList = (data) => ({
    type: 'LIST_CREATION_SUCCESS',
    data
});

export const errorCreatingList = (error) => ({
    type: 'LIST_CREATION_ERROR',
    error
});

export const updatedList = (data) => ({
    type: 'LIST_UPDATE_SUCCESS',
    data
});

export const errorUpdatingList = (error) => ({
    type: 'LIST_UPDATE_ERROR',
    error
});

export const successListingLists = (data) => ({
    type: 'LISTS_RETRIEVED',
    data
});

export const errorListingLists = (error) => ({
    type: 'LISTS_RETRIEVED_ERROR',
    error
});

export const successRetrievingList = (data) => ({
    type: 'LIST_RETRIEVED',
    data
});

export const errorRetrievingList = (error) => ({
    type: 'LIST_RETRIEVED_ERROR',
    error
});

export const deletedList = (data) => ({
    type: 'LIST_DELETION_SUCCESS',
    data
});

export const errorDeletingList = (error) => ({
    type: 'LIST_DELETION_ERROR',
    error
});

export const requestDownloadingPDF = () => ({
    type: 'PDF_DOWNLOAD_REQUEST'
});

export const successDownloadingPDF = (data) => ({
    type: 'PDF_DOWNLOAD_SUCCESS',
    data
});

export const errorDownloadingPDF = (error) => ({
    type: 'PDF_DOWNLOAD_ERROR',
    error
});

export function downloadPDF(listId) {
    const token = auth.getToken();
    return (dispatch) => {
        dispatch(requestDownloadingPDF());
        return fetch(`/api/list/generate/pdf/${listId}`, {
            headers: setAuthorisationToken(token)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error('Unable to download PDF, please try again later.'));
            })
            .then((data) => dispatch(successDownloadingPDF(data)))
            .catch((error) => dispatch(errorDownloadingPDF(error.message)));
    };
}

export function retrieveSummaryLists() {
    const token = auth.getToken();
    return (dispatch) =>
        fetch('/api/list/all', {
            headers: setAuthorisationToken(token)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error('Unable to retrieve lists, please try again later.'));
            })
            .then((data) => dispatch(successListingLists(data)))
            .catch((error) => dispatch(errorListingLists(error.message)));
}

export function retrieveSummaryListsByProject(projectName) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/project/${projectName}/lists`, {
            headers: setAuthorisationToken(token)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error('Unable to retrieve lists, please try again later.'));
            })
            .then((data) => dispatch(successListingLists(data)))
            .catch((error) => dispatch(errorListingLists(error.message)));
}

export function retrieveListById(listId) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/list/view/${listId}`, {
            headers: setAuthorisationToken(token)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error(`Unable to retrieve list with id ${listId}, please try again later.`));
            })
            .then((data) => dispatch(successRetrievingList(data)))
            .catch((error) => dispatch(errorRetrievingList(error.message)));
}

export function create(newList) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch('/api/list/update', {
            method: 'post',
            headers: setAuthorisationToken(token),
            body: JSON.stringify(newList)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(`Error creating list ${newList.listName}, list already exists.`));
            })
            .then((data) => dispatch(createdList(data)))
            .catch((error) => dispatch(errorCreatingList(error.message)));
}

export function update(existingList) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/list/update/${existingList._id}`, { // eslint-disable-line no-underscore-dangle
            method: 'post',
            headers: setAuthorisationToken(token),
            body: JSON.stringify(existingList)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(`Error updating list ${existingList.listName}, please try again later.`));
            })
            .then((data) => dispatch(updatedList(data)))
            .catch((error) => dispatch(errorUpdatingList(error.message)));
}

export function deleteList(id) {
    const token = auth.getToken();
    return (dispatch) =>
        fetch(`/api/list/delete/${id}`, {
            method: 'delete',
            headers: setAuthorisationToken(token)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error('Error deleting list, please try again later.'));
            })
            .then((data) => dispatch(deletedList(data)))
            .catch((error) => dispatch(errorDeletingList(error.message)));
}
