import React from 'react';
import renderer from 'react-test-renderer';
import ListHeadings from '../ListHeadings';

const mockHeadings = [
    {
        name: 'A',
        id: '000001',
        position: 1
    },
    {
        name: 'B',
        id: '000002',
        position: 2
    }
];

describe('ListHeadings', () => {
    it('renders headings correctly', () => {
        const tree = renderer.create(<ListHeadings headings={mockHeadings} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
