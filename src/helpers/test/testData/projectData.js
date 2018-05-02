export const mockListProjects = () => ([
    {
        _id: '5992d50066a7043f2598e12d',
        projectName: 'Iron Man',
        projectDescription: 'a description',
        colour: 'red',
        createdDate: '2017-08-15T12:02:00.000Z',
        profilesAssigned: []
    },
    {
        _id: '59a08710e57cb1da97cd1477',
        projectName: 'Thor',
        projectDescription: 'a description',
        colour: 'red',
        __v: 0,
        createdDate: '2017-08-25T20:22:40.994Z',
        profilesAssigned: []
    },
    {
        _id: '59a08bb6e57cb1da97cd1478',
        projectName: 'Captain America',
        projectDescription: 'a description',
        colour: 'grey',
        __v: 0,
        createdDate: '2017-08-25T20:42:30.159Z',
        profilesAssigned: []
    }
]);

export const mockProjectData = () => ({
    _id: '1',
    colour: 'blue',
    projectName: 'Avengers',
    projectDescription: 'a description',
    createdDate: '2017-08-25T20:42:30.159Z',
    profilesAssigned: []
});

export const mockProjectDataWithProfileA = () => ({
    _id: '1',
    colour: 'blue',
    projectName: 'Avengers',
    projectDescription: 'a description',
    createdDate: '2017-08-25T20:42:30.159Z',
    profilesAssigned: ['PROFILE_A']
});

export const mockNewProjectResultData = () => ({
    projectName: '',
    projectDescription: '',
    colour: '',
    profilesAssigned: []
});

export const mockProjectErrorResultData = () => ({
    error: {
        message: 'oh no something bad happened',
        isError: true
    }
});

export const mockProjectSuccessResultData = (action) => ({
    success: {
        message: `successfully ${action} project, woohoo`,
        data: mockProjectDataWithProfileA()
    }
});

exports = {
    mockProjectData,
    mockProjectDataWithProfileA,
    mockNewProjectResultData,
    mockProjectErrorResultData,
    mockProjectSuccessResultData,
    mockListProjects
};
