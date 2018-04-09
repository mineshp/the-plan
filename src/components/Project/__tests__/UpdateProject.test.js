import React from 'react';
import renderer from 'react-test-renderer';
import UpdateProject from '../UpdateProject';
import { mockProjectData, mockNewProjectResultData, mockProjectErrorResultData, mockProjectSuccessResultData } from '../../../helpers/test/testData/projectData';
import { mockListProfiles } from '../../../helpers/test/testData/controlCentreData';

const mockNewProjectResult = mockNewProjectResultData();
const mockExistingProjectResult = mockProjectData();
const mockErrorResult = mockProjectErrorResultData();
const mockProfiles = mockListProfiles();

const mockHandleSubmit = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleDropDownSelection = jest.fn();
const mockHandleProjectDescriptionChange = jest.fn();
const mockHandleCheckboxSelectionForProfiles = jest.fn();

describe('Create New Project', () => {
    it('renders create new project form correctly', () => {
        const tree = renderer.create(<UpdateProject
            result={mockNewProjectResult}
            profiles={mockProfiles}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
            handleProjectDescriptionChange={mockHandleProjectDescriptionChange}
            handleCheckboxSelectionForProfiles={mockHandleCheckboxSelectionForProfiles}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after successful creation of project', () => {
        const tree = renderer.create(<UpdateProject
            result={mockProjectSuccessResultData('created')}
            profiles={mockProfiles}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
            handleProjectDescriptionChange={mockHandleProjectDescriptionChange}
            handleCheckboxSelectionForProfiles={mockHandleCheckboxSelectionForProfiles}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after error creating new project', () => {
        const tree = renderer.create(<UpdateProject
            result={mockErrorResult}
            profiles={mockProfiles}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
            handleProjectDescriptionChange={mockHandleProjectDescriptionChange}
            handleCheckboxSelectionForProfiles={mockHandleCheckboxSelectionForProfiles}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Update Existing Project', () => {
    it('renders update existing project form correctly', () => {
        const tree = renderer.create(<UpdateProject
            result={mockExistingProjectResult}
            profiles={mockProfiles}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
            handleProjectDescriptionChange={mockHandleProjectDescriptionChange}
            handleCheckboxSelectionForProfiles={mockHandleCheckboxSelectionForProfiles}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after successful creation of project', () => {
        const tree = renderer.create(<UpdateProject
            result={mockProjectSuccessResultData('updated')}
            profiles={mockProfiles}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
            handleProjectDescriptionChange={mockHandleProjectDescriptionChange}
            handleCheckboxSelectionForProfiles={mockHandleCheckboxSelectionForProfiles}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after error creating new project', () => {
        const tree = renderer.create(<UpdateProject
            result={mockErrorResult}
            profiles={mockProfiles}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
            handleProjectDescriptionChange={mockHandleProjectDescriptionChange}
            handleCheckboxSelectionForProfiles={mockHandleCheckboxSelectionForProfiles}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
