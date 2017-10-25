import React from 'react';
import renderer from 'react-test-renderer';
import ListItems from '../ListItems';

const mockItems = [
    {
        id: '0001',
        columns: [
            {
                columnName: 'ItemName',
                columnPosition: 1,
                columnValue: 'Bread',
                columnId: '001'
            },
            {
                columnName: 'Description',
                columnPosition: 2,
                columnValue: 'Loaf of granary bread',
                columnId: '002'
            }
        ]
    },
    {
        id: '0002',
        columns: [
            {
                columnName: 'ItemName',
                columnPosition: 1,
                columnValue: 'Milk',
                columnId: '003'
            },
            {
                columnName: 'Description',
                columnPosition: 2,
                columnValue: '1 Pint of Milk',
                columnId: '004'
            }
        ]
    }
];

describe('ListItems', () => {
    it('renders list items correctly', () => {
        const tree = renderer.create(<ListItems items={mockItems} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
