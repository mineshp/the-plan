import React from 'react';
import renderer from 'react-test-renderer';
import Manage from '../Manage';

const mockListAll = [
    {
        _id: '5992092f66a7043f2598c88e',
        projects: [
            {
                id: 'abc123',
                name: 'biology'
            },
            {
                id: 'xyz123',
                name: 'chemistry'
            }
        ],
        listName: 'HumanBody',
        createdDate: '2016-05-18T16:00:00Z',
        updatedDate: '2016-05-18T16:00:00Z',
        headings: [
            {
                position: 1,
                id: '1',
                name: 'Name'
            },
            {
                position: 2,
                id: '2',
                name: 'Created'
            }
        ],
        items: [
            {
                updatedDate: '2016-05-18T16:00:00Z',
                createdDate: '2016-05-18T16:00:00Z',
                position: 1,
                id: '1',
                name: 'Head'
            },
            {
                updatedDate: '2016-05-18T16:00:00Z',
                createdDate: '2016-05-18T16:00:00Z',
                position: 2,
                id: '2',
                name: 'Shoulder'
            }
        ]
    }
];

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json'
    }
});

describe('Manage Lists', () => {
    beforeEach(() => {
        window.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve(mockResponse(200, null, JSON.stringify(mockListAll))));
    });

    it('renders correctly', () => {
        const tree = renderer.create(<Manage />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
