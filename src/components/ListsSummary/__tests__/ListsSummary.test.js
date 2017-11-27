import React from 'react';
import renderer from 'react-test-renderer';
import ListsSummary from '../ListsSummary';
import List from '../ListRow';
import { mockAllListsData } from '../../../helpers/test/testData/listData';

const mockAllLists = mockAllListsData();

const mockDeleteList = jest.fn();

const Rows = [];
mockAllLists.map((list) =>
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

