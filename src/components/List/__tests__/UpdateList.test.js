import React from 'react';
import renderer from 'react-test-renderer';
import UpdateList from '../UpdateList';
import { mockHeadingsData, mockProjectDropDownOptionsData, mockNewListResultData, mockExistingListWithNoProjects } from '../../../helpers/test/testData/listData';

const mockHandleSubmit = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleDropDownSelection = jest.fn();
const mockHandleHeaderInputChange = jest.fn();
const mockAddHeading = jest.fn();
const mockRemoveHeading = jest.fn();

const mockProjectOptions = mockProjectDropDownOptionsData();

const mockHeadings = mockHeadingsData();

describe('Create New List', () => {
    it('renders create new list form correctly', () => {
        const tree = renderer.create(<UpdateList
            projectOptions={mockProjectOptions}
            result={mockNewListResultData()}
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
            result={mockExistingListWithNoProjects()}
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
