import React from 'react';
import renderer from 'react-test-renderer';
import ListItems from '../ListItems';

const mockItems = [
    {
        columns: [
            {
                columnId: '001',
                columnValue: 'Hola',
                columnPosition: 1,
                columnName: 'Spanish'
            },
            {
                columnId: '002',
                columnValue: 'Hello',
                columnPosition: 1,
                columnName: 'English'
            },
        ],
        id: '001'
    },
    {
        columns: [
            {
                columnId: '003',
                columnValue: 'Adios',
                columnPosition: 1,
                columnName: 'Spanish'
            },
            {
                columnId: '004',
                columnValue: 'Bye',
                columnPosition: 1,
                columnName: 'English'
            },
        ],
        id: '002'
    }
];

describe('ListHeadings', () => {
    it('renders headings correctly', () => {
        const tree = renderer.create(<ListItems items={mockItems} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
