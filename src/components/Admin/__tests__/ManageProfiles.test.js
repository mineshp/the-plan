import React from 'react';
import renderer from 'react-test-renderer';
import ManageProfilesComponent from '../ManageProfiles';
import { mockListProfiles, mockListUsers } from '../../../helpers/test/testData/controlCentreData';
import { mockListProjects } from '../../../helpers/test/testData/projectData';

const mockHandleManageProfilesAccordionClick = jest.fn();
const mockHandleDeleteProfile = jest.fn();
const mockHandleProfileStatus = jest.fn();
const mockProfiles = mockListProfiles();
const mockHandleProfileNameChange = jest.fn();
const mockHandleProfileActiveChange = jest.fn();
const mockHandleSubmit = jest.fn();
const mockHandleSubmitToAssignProjectsToProfile = jest.fn();
const mockHandleDropDownChange = jest.fn();
const mockProjects = mockListProjects();
const mockUsers = mockListUsers();
const mockHandleProjectCheckboxChange = jest.fn();
const mockHandleUsersDropDownChange = jest.fn();
const mockHandleSubmitToAssignUsersToProfile = jest.fn();
const mockHandleProfilesCheckboxChange = jest.fn();

describe('Admin > Manage > ManageProfiles', () => {
    it('renders ManageProfiles component', () => {
        const tree = renderer.create(
            <ManageProfilesComponent
                activeIndex={0}
                handleManageProfilesAccordionClick={mockHandleManageProfilesAccordionClick}
                profiles={mockProfiles}
                projects={mockProjects}
                users={mockUsers}
                handleDeleteProfile={mockHandleDeleteProfile}
                handleProfileStatus={mockHandleProfileStatus}
                handleProfileNameChange={mockHandleProfileNameChange}
                handleProfileActiveChange={mockHandleProfileActiveChange}
                handleSubmit={mockHandleSubmit}
                handleSubmitToAssignProjectsToProfile={mockHandleSubmitToAssignProjectsToProfile}
                handleDropDownChange={mockHandleDropDownChange}
                handleProjectCheckboxChange={mockHandleProjectCheckboxChange}
                handleUsersDropDownChange={mockHandleUsersDropDownChange}
                handleSubmitToAssignUsersToProfile={mockHandleSubmitToAssignUsersToProfile}
                handleProfilesCheckboxChange={mockHandleProfilesCheckboxChange}
            />
        );
        expect(tree).toMatchSnapshot();
    });
});
