import React from 'react';
import renderer from 'react-test-renderer';
import List from '../List';
import ListRow from '../ListRow';

const mockResult = {};
const mockErrorResult = {
    error: {
        message: 'oh no something bad happened',
        isError: true
    }
};
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

const Rows = [];
mockListAll.map((list) =>
    // eslint-disable-next-line no-underscore-dangle
    Rows.push(<ListRow data={list} key={list._id} />)
);

describe('List', () => {
    it('renders lists correctly', () => {
        const tree = renderer.create(<List
            errors={mockResult}
            rows={Rows}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after successful creation of project', () => {
        const tree = renderer.create(<List
            errors={mockResult}
            rows={Rows}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after error creating new project', () => {
        const tree = renderer.create(<List
            errors={mockErrorResult}
            rows={Rows}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

