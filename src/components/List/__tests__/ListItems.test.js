import React from 'react';
import renderer from 'react-test-renderer';
import ListItems from '../ListItems';

const mockHandleChange = jest.fn();
const mockHandleDelete = jest.fn();
const mockItems = [
    {
        columns: [
            {
                columnId: '001',
                columnValue: 'Hola',
                columnName: 'Spanish'
            },
            {
                columnId: '002',
                columnValue: 'Hello',
                columnName: 'English'
            },
        ],
        rowId: '001'
    },
    {
        columns: [
            {
                columnId: '003',
                columnValue: 'Adios',
                columnName: 'Spanish'
            },
            {
                columnId: '004',
                columnValue: 'Bye',
                columnName: 'English'
            },
        ],
        rowId: '002'
    }
];

describe('ListHeadings', () => {
    it('renders headings correctly', () => {
        const tree = renderer.create(<ListItems items={mockItems} handleChange={mockHandleChange} handleDelete={mockHandleDelete} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
