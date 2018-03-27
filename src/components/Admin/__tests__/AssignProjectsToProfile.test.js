import React from 'react';
import renderer from 'react-test-renderer';
import AssignProjectsToProfile from '../AssignProjectsToProfile';
import { mockListProfiles } from '../../../helpers/test/testData/controlCentreData';
import { mockListProjects } from '../../../helpers/test/testData/projectData';

const mockHandleSubmitToAssignProjectsToProfile = jest.fn();
const mockHandleDropDownChange = jest.fn();
const mockHandleProjectCheckboxChange = jest.fn();

describe('Admin > Manage > AssignProjectsToProfile', () => {
    const mockProfiles = mockListProfiles();
    const mockProjects = mockListProjects();
    it('renders ListUsers component', () => {
        const tree = renderer.create(
            <AssignProjectsToProfile
                profiles={mockProfiles}
                projects={mockProjects}
                handleSubmitToAssignProjectsToProfile={mockHandleSubmitToAssignProjectsToProfile}
                handleDropDownChange={mockHandleDropDownChange}
                handleProjectCheckboxChange={mockHandleProjectCheckboxChange}
            />
        );
        expect(tree).toMatchSnapshot();
    });
});
