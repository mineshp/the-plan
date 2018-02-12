jest.mock('jwt-decode');
const decode = require('jwt-decode');
const Auth = require('../Auth').default;

describe('Auth Service', () => {
    beforeEach(() => {
        const localStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn()
        };
        global.localStorage = localStorageMock;
    });

    afterEach(() => {
        global.localStorage.getItem.mockReset();
        global.localStorage.setItem.mockReset();
        global.localStorage.removeItem.mockReset();
    });

    describe('LoggedIn', () => {
        it('returns true when the user is logged in', () => {
            const date = new Date();
            decode.mockImplementation(() => ({ exp: date.getTime() }));
            global.localStorage.getItem.mockImplementation(() => 'asecrettoken');
            expect(Auth.prototype.loggedIn()).toBe(true);
        });

        it('returns false when the user is logged in but the token has expired', () => {
            decode.mockImplementation(() => ({ exp: 12345 }));
            global.localStorage.getItem.mockImplementation(() => 'asecrettoken');
            expect(Auth.prototype.loggedIn()).toBe(false);
        });

        it('returns false when the user is not logged in', () => {
            expect(Auth.prototype.loggedIn()).toBe(false);
        });
    });

    describe('isTokenExpired', () => {
        it('if token expiry is in the past', () => {
            decode.mockImplementation(() => ({
                username: 'testUser',
                email: 'myemail@test.com',
                exp: 12345
            }));

            expect(Auth.prototype.isTokenExpired('myToken')).toBe(true);
        });

        it('if token expiry is in the future', () => {
            const date = new Date();
            decode.mockReset();
            decode.mockImplementation(() => ({
                username: 'testUser',
                email: 'myemail@test.com',
                exp: date.getTime()
            }));

            expect(Auth.prototype.isTokenExpired('myToken')).toBe(false);
        });

        it('if token failed to be decoded isTokenExpired is true', () => {
            decode.mockReset();
            decode.mockImplementation(() => { throw new Error('oh-no'); });
            expect(decode).toThrow('oh-no');
            expect(Auth.prototype.isTokenExpired('myToken')).toBe(true);
        });
    });

    describe('setToken', () => {
        it('jwtToken and isLoggedOn is set', () => {
            Auth.prototype.setToken('aSecretToken');
            expect(global.localStorage.setItem).toHaveBeenCalledTimes(2);
        });
    });

    describe('getToken', () => {
        it('key jwtToken', () => {
            global.localStorage.getItem.mockImplementation(() => 'abc');
            expect(Auth.prototype.getToken()).toEqual('abc');
        });
    });

    describe('logout', () => {
        it('remove localStorage items', () => {
            Auth.prototype.logout();
            expect(global.localStorage.removeItem).toHaveBeenCalledTimes(2);
        });
    });

    describe('getUserProfile', () => {
        it('Retrieve token', () => {
            decode.mockImplementation(() => ({
                username: 'testUser',
                email: 'myemail@test.com'
            }));
            Auth.prototype.getUserProfile();
            expect(decode).toHaveBeenCalled();
            expect(Auth.prototype.getUserProfile()).toEqual({
                username: 'testUser',
                email: 'myemail@test.com'
            });
        });
    });
});

