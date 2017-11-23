import React from 'react';
import renderer from 'react-test-renderer';
import ListFooter from '../ListFooter';

const mockHandleAddItem = jest.fn();
const mockHandleSubmit = jest.fn();
const mockNumColumns = 3;

describe('ListHeadings', () => {
    it('renders footer correctly', () => {
        const tree = renderer.create(<ListFooter
            numColumns={mockNumColumns}
            handleAddItem={mockHandleAddItem}
            handleSubmit={mockHandleSubmit}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
