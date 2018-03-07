import React from 'react';
import renderer from 'react-test-renderer';
import ListItems from '../ListItems';
import { mockItemsData, mockCompletedItemsData } from '../../../helpers/test/testData/listData';

const mockhandleChange = jest.fn();
const mockHandleDelete = jest.fn();
const mockHandleCompleted = jest.fn();
const mockItems = mockItemsData();
const mockCompletedItems = mockCompletedItemsData();

describe('ListItems', () => {
    it('renders list items correctly', () => {
        const tree = renderer.create(
            <ListItems
                items={mockItems}
                handleChange={mockhandleChange}
                handleDelete={mockHandleDelete}
                handleCompleted={mockHandleCompleted}
            />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders list items correctly that have some completed items', () => {
        const tree = renderer.create(
            <ListItems
                items={mockCompletedItems}
                handleChange={mockhandleChange}
                handleDelete={mockHandleDelete}
                handleCompleted={mockHandleCompleted}
            />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
