import React from 'react';
import renderer from 'react-test-renderer';
import ListItems from '../ListItems';
import { mockItemsData } from '../../../helpers/test/testData/listData';

const mockhandleChange = jest.fn();
const mockHandleDelete = jest.fn();
const mockItems = mockItemsData();

describe('ListItems', () => {
    it('renders list items correctly', () => {
        const tree = renderer.create(
            <ListItems
                items={mockItems}
                handleChange={mockhandleChange}
                handleDelete={mockHandleDelete}
            />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
