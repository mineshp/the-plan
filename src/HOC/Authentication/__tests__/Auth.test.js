const Auth = require('../Auth').default;

Auth.prototype.getToken = jest.genMockFn();
Auth.prototype.getToken.mockImplementation(() => 'asecrettoken');

describe('Auth Service Helper', () => {
    it('loggedIn - returns whether the user is logged in', () => {
        // Mock getToken
        // expect(Auth.loggedIn).toBe(false);
    });
});

