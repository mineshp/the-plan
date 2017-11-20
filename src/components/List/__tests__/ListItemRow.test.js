import React from 'react';
import renderer from 'react-test-renderer';
import ListItems from '../ListItems';

const mockhandleChange = jest.fn();
const mockHandleDelete = jest.fn();
const mockItems = [
    {
        rowId: '0001',
        columns: [
            {
                columnName: 'ItemName',
                columnValue: 'Bread',
            },
            {
                columnName: 'Description',
                columnValue: 'Loaf of granary bread',
            }
        ]
    },
    {
        rowId: '0002',
        columns: [
            {
                columnName: 'ItemName',
                columnValue: 'Milk',
            },
            {
                columnName: 'Description',
                columnValue: '1 Pint of Milk',
            }
        ]
    }
];

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
