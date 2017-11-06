import React from 'react';
import renderer from 'react-test-renderer';
import UpdateList from '../UpdateList';

const mockHandleSubmit = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleDropDownSelection = jest.fn();
const mockHandleHeaderInputChange = jest.fn();
const mockAddHeading = jest.fn();
const mockRemoveHeading = jest.fn();

const mockProjectOptions = [
    { key: '001', value: 'proj1', text: 'proj1' },
    { key: '002', value: 'proj2', text: 'proj2' },
    { key: '003', value: 'proj3', text: 'proj3' },
];

const mockHeadings = [
    { name: 'Spanish', id: '1', position: 1 },
    { name: 'English', id: '2', position: 2 }
];

describe('Create New List', () => {
    const mockNewListResult = {
        listName: 'New List',
        projects: []
    };

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
});

describe('Update List', () => {
    const mockExistingListWithNoProjects = {
        listName: 'Existing List',
        headings: [
            {
                id: '101',
                name: 'Description'
            }
        ]
    };

    const mockExistingListWithProjects = Object.assign({}, mockExistingListWithNoProjects, {
        projects: [
            {
                id: '001',
                name: 'History'
            }
        ]
    });

    it('renders existing list form correctly when no projects have been assigned', () => {
        const tree = renderer.create(<UpdateList
            projectOptions={mockProjectOptions}
            result={mockExistingListWithNoProjects}
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

    it('renders existing list form correctly when projects have already been assigned', () => {
        const tree = renderer.create(<UpdateList
            projectOptions={mockProjectOptions}
            result={mockExistingListWithProjects}
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
