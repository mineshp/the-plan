import React from 'react';
import renderer from 'react-test-renderer';
import ListsSummary from '../ListsSummary';
import List from '../ListRow';

const mockListAll = [
    {
        _id: '001',
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
        updatedDate: '2016-05-18T16:00:00Z'
    },
    {
        _id: '002',
        projects: [
            {
                id: '0011',
                name: 'history'
            }
        ],
        listName: 'Explorers',
        createdDate: '2016-10-8T13:16:00Z',
        updatedDate: '2016-10-8T16:00:00Z',
    }
];

const mockDeleteList = jest.fn();

const Rows = [];
mockListAll.map((list) =>
    // eslint-disable-next-line no-underscore-dangle
    Rows.push(<List data={list} key={list._id} onDeleteHandler={mockDeleteList} />)
);

describe('List', () => {
    it('renders lists correctly', () => {
        const tree = renderer.create(<ListsSummary
            rows={Rows}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

