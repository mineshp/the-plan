export const createdList = (data) => ({
    type: 'LIST_CREATION_SUCCESS',
    data
});

export const errorCreatingList = (error) => ({
    type: 'LIST_CREATION_ERROR',
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

export function retrieveSummaryLists() {
    return (dispatch) =>
        fetch('/list/all')
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
    return (dispatch) =>
        fetch(`/list/view/${listId}`)
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
    return (dispatch) =>
        fetch('/list/update', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
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
