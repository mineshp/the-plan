export const successListingLists = (data) => ({
    type: 'LISTS_RETRIEVED',
    data
});

export const errorListingLists = (error) => ({
    type: 'LISTS_RETRIEVED_ERROR',
    error
});

export function retrieveLists() {
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
