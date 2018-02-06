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
