import setAuthorisationToken from '../utils/setAuthorisationToken';
import Auth from '../HOC/Authentication/Auth';

const auth = new Auth();

export const successRetrievingUsers = (data) => ({
    type: 'USERS_RETRIEVED',
    data
});

export const errorRetrievingUsers = (error) => ({
    type: 'USERS_RETRIEVED_ERROR',
    error
});

export function retrieveUsers() {
    const token = auth.getToken();
    return (dispatch) =>
        fetch('/api/admin/manage/users', {
            headers: setAuthorisationToken(token)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(new Error('Unable to retrieve users, please try again later.'));
            })
            .then((data) => dispatch(successRetrievingUsers(data)))
            .catch((error) => dispatch(errorRetrievingUsers(error.message)));
}