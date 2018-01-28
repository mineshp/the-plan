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

export const successLogin = (data) => ({
    type: 'SUCCESS_LOGIN',
    data
});

export const errorLogin = (error) => ({
    type: 'ERROR_LOGIN',
    error
});

export function loginUser(loginDetails) {
    return (dispatch) =>
        fetch('/api/user/login', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDetails)
        })
            .then((res) => {
                if (res.ok) {
                    // console.log('res', res);
                    // console.log('res.jwt', res.jwt);
                    // sessionStorage.setItem('jwt', res.jwt);
                    return res.json();
                }
                return Promise.reject(
                    new Error(`Unable to login with username ${loginDetails.username}, please check username and password are correct.`));
            })
            .then((data) => dispatch(successLogin(data)))
            .catch((error) => dispatch(errorLogin(error.message)));
}
