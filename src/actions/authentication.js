export const successRegisteringUser = (data) => ({
    type: 'SUCCESS_USER_REGISTERED',
    data
});

export const errorRegisteringUser = (error) => ({
    type: 'ERROR_USER_REGISTERED',
    error
});

export function registerUser(registrationData) {
    return (dispatch) =>
        fetch('/api/user/register', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registrationData)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(
                    new Error(`Unable to register user ${registrationData.username}, please try again later.`));
            })
            .then((data) => dispatch(successRegisteringUser(data)))
            .catch((error) => dispatch(errorRegisteringUser(error.message)));
}
