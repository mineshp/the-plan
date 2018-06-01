export const mockRegisterUser = () => ({
    email: 'test@mytestemail.com',
    username: 'testUser',
    password: 'password123',
    confirmPassword: 'password123'
});

export const mockLoginUser = () => ({
    user: {
        username: 'testUser'
    },
    token: 'asecrettokenonlyforyou'
});

export const mockLoginDetails = () => ({
    username: 'testUser',
    password: 'passwordBlah1'
});

export const mockUser = () => (
    {
        id: '1234567',
        email: 'test@mytestemail.com',
        username: 'testUser',
        isAdmin: false,
        profile: ['TESTA', 'TESTB', 'TESTC'],
        profilesToDisplay: ['TESTC']
    }
);

export const mockAdminUser = () => (
    {
        id: '1234567',
        email: 'test@mytestemail.com',
        username: 'adminUser',
        isAdmin: true,
        profile: ['TESTA', 'TESTB', 'TESTC'],
        profilesToDisplay: ['TESTC']
    }
);

export const mockProfileOptions = () => (
    [
        {
            key: 123456789,
            value: 'TESTA',
            text: 'TESTA'
        },
        {
            key: 123456788,
            value: 'TESTB',
            text: 'TESTB'
        },
        {
            key: 123456787,
            value: 'TESTC',
            text: 'TESTC'
        }
    ]
);
