import React from 'react';
import renderer from 'react-test-renderer';
import UpdateList from '../UpdateList';

const mockHandleSubmit = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleDropDownSelection = jest.fn();
const mockHandleHeaderInputChange = jest.fn();
const mockAddHeading = jest.fn();
const mockRemoveHeading = jest.fn();

const mockNewListResult = {
    listName: 'New List'
};

const mockProjectOptions = [
    { key: '001', value: 'proj1', text: 'proj1' },
    { key: '002', value: 'proj2', text: 'proj2' },
    { key: '003', value: 'proj3', text: 'proj3' },
];

const mockHeadings = [
    { name: 'Spanish', id: '1', position: 1 },
    { name: 'English', id: '2', position: 2 }
];

const mockErrorResult = {
    error: {
        isError: true,
        message: 'uh-oh'
    }
};

describe('Create New List', () => {
    it('renders create new list form correctly', () => {
        const tree = renderer.create(<UpdateList
            projectOptions={mockProjectOptions}
            result={mockNewListResult}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
            handleHeaderInputChange={mockHandleHeaderInputChange}
            addHeading={mockAddHeading}
            removeHeading={mockRemoveHeading}
            headings={mockHeadings}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after error creating new project', () => {
        const tree = renderer.create(<UpdateList
            projectOptions={mockProjectOptions}
            result={mockErrorResult}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
            handleHeaderInputChange={mockHandleHeaderInputChange}
            addHeading={mockAddHeading}
            removeHeading={mockRemoveHeading}
            headings={mockHeadings}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
