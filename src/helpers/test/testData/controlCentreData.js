export const mockListUsers = () => ([
    {
        _id: '1234567',
        email: 'test@mytestemail.com',
        username: 'testUser',
        isAdmin: true
    },
    {
        _id: '1234568',
        email: 'test@anotheremail.com',
        username: 'god',
        isAdmin: false
    },
]);

export const mockListProfiles = () => ([
    {
        _id: '1234567',
        name: 'MIN_JIGS_WEDDING',
        active: true
    },
    {
        _id: '1234568',
        name: 'HOME_DIY',
        active: true
    },
    {
        _id: '1234569',
        name: 'CHRISTMAS',
        active: false
    }
]);

export const mockProfileCreated = () => (
    {
        _id: '999879',
        name: 'NEW_PROFILE',
        active: true,
        createdDate: 'aDate',
        updatedDate: expect.any(Date)
    }
);
