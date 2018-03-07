export const mockSingleList = () => ({
    _id: '123',
    projects: [
        {
            id: 'abc123',
            name: 'superheroes'
        },
        {
            id: 'xyz123',
            name: 'avengers'
        }
    ],
    listName: 'Avengers',
    owner: 'testUser',
    headings: [{ id: '1', name: 'a' }, { id: '2', name: 'b' }, { id: '3', name: 'c' }],
    items: [
        {
            rowId: '123',
            columns: [
                {
                    columnName: 'a',
                    columnValue: 'Thor'
                },
                {
                    columnName: 'b',
                    columnValue: 'Captain America'
                },
                {
                    columnName: 'c',
                    columnValue: 'Iron Man'
                }
            ]
        }
    ],
    createdDate: new Date()
});

export const mockUpdateSingleList = () => ({
    _id: '12345678',
    listName: 'test',
    projects: [
        {
            name: 'Justice League',
            id: '001'
        }
    ],
    headings: [
        {
            id: '1',
            name: 'Name'
        },
        {
            id: '2',
            name: 'Role'
        }
    ],
    createdDate: new Date()
});

export const mockListRowData = () => ({
    _id: '1234456',
    listName: 'Avengers - Age of Ultron',
    projects: [{
        id: '1',
        name: 'Thor'
    },
    {
        id: '2',
        name: 'Loki'
    }]
});

export const mockAllListsData = () => ([
    {
        _id: '001',
        projects: [
            {
                id: 'abc123',
                name: 'technology'
            },
            {
                id: 'xyz123',
                name: 'reactor'
            }
        ],
        listName: 'Iron Man',
        createdDate: '2016-05-18T16:00:00Z',
        updatedDate: '2016-05-18T16:00:00Z'
    },
    {
        _id: '002',
        projects: [
            {
                id: '0011',
                name: 'hammer'
            }
        ],
        listName: 'Thor',
        createdDate: '2016-10-8T13:16:00Z',
        updatedDate: '2016-10-8T16:00:00Z',
    }
]);

export const mockHeadingsData = () => ([
    {
        name: 'A',
        id: '000001'
    },
    {
        name: 'B',
        id: '000002'
    }
]);

export const mockItemsData = () => ([
    {
        rowId: '001-002',
        columns: [
            {
                columnName: 'Name',
                columnValue: 'Captain America'
            },
            {
                columnName: 'Desc',
                columnValue: 'The first avenger'
            }
        ]
    }
]);

export const mockCompletedItemsData = () => ([
    {
        rowId: '001-002',
        completed: true,
        columns: [
            {
                columnName: 'Name',
                columnValue: 'Captain America'
            },
            {
                columnName: 'Desc',
                columnValue: 'The first avenger'
            }
        ]
    }
]);

export const mockProjectDropDownOptionsData = () => ([
    { key: '001', value: 'proj1', text: 'proj1' },
    { key: '002', value: 'proj2', text: 'proj2' },
    { key: '003', value: 'proj3', text: 'proj3' },
]);

export const mockNewListResultData = () => ({
    listName: 'New Avengers',
    projects: []
});

export const mockExistingListWithNoProjects = () => ({
    listName: 'Original Avengers',
    headings: [
        {
            id: '101',
            name: 'Description'
        }
    ]
});

exports = {
    mockSingleList,
    mockUpdateSingleList,
    mockListRowData,
    mockAllListsData,
    mockHeadingsData,
    mockItemsData,
    mockCompletedItemsData,
    mockNewListResultData,
    mockExistingListWithNoProjects
};
