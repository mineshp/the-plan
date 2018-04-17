import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import ListsSummary from '../ListsSummary';
import List from '../ListRow';
import { mockAllListsData } from '../../../helpers/test/testData/listData';

const mockAllLists = mockAllListsData();
const mockDeleteList = jest.fn();
const mockHandleCompleted = jest.fn();
const mockOnBtnClickHandler = jest.fn();

const Rows = [];
mockAllLists.map((list) =>
    Rows.push(
        <List
            data={list}
            key={list._id} // eslint-disable-line no-underscore-dangle
            onDeleteHandler={mockDeleteList}
            handleCompleted={mockHandleCompleted}
            onBtnClickHandler={mockOnBtnClickHandler}
        />)
);

describe('List', () => {
    it('renders lists correctly', () => {
        const tree = renderer.create(<MemoryRouter><ListsSummary
            rows={Rows}
            retrieveListBy={'all'}
        /></MemoryRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

