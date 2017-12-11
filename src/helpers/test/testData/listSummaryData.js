export const mockListSummary = () => ([
    {
        _id: '001',
        projects: [
            {
                id: 'abc123',
                name: 'dc'
            },
            {
                id: 'xyz123',
                name: 'marvel'
            }
        ],
        listName: 'Avengers',
        createdDate: '2016-05-18T16:00:00Z',
        updatedDate: '2016-05-18T16:00:00Z'
    },
    {
        _id: '002',
        projects: [
            {
                id: '0011',
                name: 'jedi'
            }
        ],
        listName: 'starwars',
        createdDate: '2016-10-8T13:16:00Z',
        updatedDate: '2016-10-8T16:00:00Z',
    }
]);

export const mockListSummaryByProject = () => ([
    {
        _id: '001',
        projects: [
            {
                id: 'abc123',
                name: 'dc'
            },
            {
                id: 'xyz123',
                name: 'marvel'
            }
        ],
        listName: 'Avengers',
        createdDate: '2016-05-18T16:00:00Z',
        updatedDate: '2016-05-18T16:00:00Z'
    },
    {
        _id: '002',
        projects: [
            {
                id: 'xyz123',
                name: 'marvel'
            }
        ],
        listName: 'starwars',
        createdDate: '2016-10-8T13:16:00Z',
        updatedDate: '2016-10-8T16:00:00Z',
    }
]);

exports = {
    mockListSummary,
    mockListSummaryByProject
};
