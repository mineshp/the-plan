import React from 'react';
import renderer from 'react-test-renderer';
import HeadingInput from '../HeadingInput';
import { mockHeadingsData } from '../../../helpers/test/testData/listData';

const mockHeadings = mockHeadingsData();

const mockHandleAddColumn = jest.fn();
const mockHandleRemoveColumn = jest.fn();
const mockHandleHeaderInputChange = jest.fn();

describe('HeadingInput', () => {
    it('renders column headings in a grid correctly', () => {
        const tree = renderer.create(
            <HeadingInput
                headings={mockHeadings}
                handleAddColumn={mockHandleAddColumn}
                handleRemoveColumn={mockHandleRemoveColumn}
                handleHeaderInputChange={mockHandleHeaderInputChange}
            />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
