const Auth = require('../Auth').default;


describe('Auth Service', () => {
    describe('LoggedIn', () => {
        it('returns true when the user is logged in', () => {
            Auth.prototype.getToken = jest.genMockFn();
            Auth.prototype.getToken.mockImplementation(() => 'asecrettoken');
            Auth.prototype.isTokenExpired = jest.genMockFn();
            Auth.prototype.isTokenExpired.mockImplementation(() => false);
            expect(Auth.prototype.loggedIn()).toBe(true);
        });

        it('returns false when the user is logged in but the token has expired', () => {
            Auth.prototype.getToken = jest.genMockFn();
            Auth.prototype.getToken.mockImplementation(() => 'asecrettoken');
            Auth.prototype.isTokenExpired = jest.genMockFn();
            Auth.prototype.isTokenExpired.mockImplementation(() => true);
            expect(Auth.prototype.loggedIn()).toBe(false);
        });

        it('returns false when the user is not logged in', () => {
            Auth.prototype.getToken = jest.genMockFn();
            expect(Auth.prototype.loggedIn()).toBe(false);
        });
    });
});

