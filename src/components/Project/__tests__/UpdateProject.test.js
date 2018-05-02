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
            profilesAssigned={[]}
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
            result={mockProjectSuccessResultData('created').success.data}
            profilesAssigned={[]}
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
            profilesAssigned={[]}
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
            profilesAssigned={[]}
            profiles={mockProfiles}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
            handleProjectDescriptionChange={mockHandleProjectDescriptionChange}
            handleCheckboxSelectionForProfiles={mockHandleCheckboxSelectionForProfiles}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after successful update of project', () => {
        const tree = renderer.create(<UpdateProject
            result={mockProjectSuccessResultData('updated')}
            profilesAssigned={[]}
            profiles={mockProfiles}
            handleSubmit={mockHandleSubmit}
            handleChange={mockHandleChange}
            handleDropDownSelection={mockHandleDropDownSelection}
            handleProjectDescriptionChange={mockHandleProjectDescriptionChange}
            handleCheckboxSelectionForProfiles={mockHandleCheckboxSelectionForProfiles}
        />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders successfully after successful update of project with updated profiles', () => {
        const tree = renderer.create(<UpdateProject
            result={mockProjectSuccessResultData('updated')}
            profilesAssigned={['PROFILEX', 'PROFILEY']}
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
            profilesAssigned={[]}
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
