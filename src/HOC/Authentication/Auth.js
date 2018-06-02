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
            return true;
        }
    }

    setToken(jwtToken) {
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('isLoggedIn', true);
        const { profilesToDisplay } = this.getUserProfile();
        localStorage.setItem('profilesToDisplay', profilesToDisplay);
    }

    getToken() {
        return localStorage.getItem('jwtToken');
    }

    logout() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('profilesToDisplay');
        localStorage.removeItem('isLoggedIn');
    }

    getUserProfile() {
        return decode(this.getToken());
    }

    saveProfileDataForUser(profilesSet) {
        localStorage.removeItem('profilesToDisplay');
        localStorage.setItem('profilesToDisplay', profilesSet);
    }

    getProfilesToDisplay() {
        return localStorage.getItem('profilesToDisplay') || '';
    }
}
