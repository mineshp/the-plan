import React from 'react';
import renderer from 'react-test-renderer';
import ListItems from '../ListItems';
import { mockItemsData } from '../../../helpers/test/testData/listData';

const mockHandleChange = jest.fn();
const mockHandleDelete = jest.fn();
const mockItems = mockItemsData();

describe('ListHeadings', () => {
    it('renders headings correctly', () => {
        const tree = renderer.create(
            <ListItems
                items={mockItems}
                handleChange={mockHandleChange}
                handleDelete={mockHandleDelete}
            />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
