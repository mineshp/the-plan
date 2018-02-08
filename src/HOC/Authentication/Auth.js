import decode from 'jwt-decode';

export default class Auth {
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    }

    setToken(jwtToken) {
        sessionStorage.setItem('jwtToken', jwtToken);
        sessionStorage.setItem('isLoggedIn', true);
    }

    getToken() {
        return sessionStorage.getItem('jwtToken');
    }

    logout() {
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('isLoggedIn');
    }

    getUserProfile() {
        return decode(this.getToken());
    }
}
