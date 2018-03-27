import React from 'react';
import { shallow } from 'enzyme';
import ControlCentreComponent from '../ControlCentre';
import ListUsersComponent from '../ListUsers';
import { mockListUsers, mockListProfiles } from '../../../helpers/test/testData/controlCentreData';
import { mockListProjects } from '../../../helpers/test/testData/projectData';

const mockHandleDeleteUser = jest.fn();
const mockHandleResetPassword = jest.fn();
const mockHandleManageProfilesAccordionClick = jest.fn();
const mockHandleDeleteProfile = jest.fn();
const mockHandleProfileStatus = jest.fn();
const mockHandleProfileNameChange = jest.fn();
const mockHandleProfileActiveChange = jest.fn();
const mockHandleSubmit = jest.fn();
const mockHandleDropDownChange = jest.fn();
const mockHandleSubmitToAssignProjectsToProfile = jest.fn();
const mockHandleProjectCheckboxChange = jest.fn();

const mockActiveIndex = 0;

describe('ControlCentre', () => {
    const mockUsers = mockListUsers();
    const mockProfiles = mockListProfiles();
    const mockProjects = mockListProjects();

    it('renders ListUsers component', () => {
        const wrapper = shallow(<ControlCentreComponent
            users={mockUsers}
            profiles={mockProfiles}
            projects={mockProjects}
            handleDeleteUser={mockHandleDeleteUser}
            handleResetPwd={mockHandleResetPassword}
            handleManageProfilesAccordionClick={mockHandleManageProfilesAccordionClick}
            handleDeleteProfile={mockHandleDeleteProfile}
            handleProfileStatus={mockHandleProfileStatus}
            activeIndex={mockActiveIndex}
            handleProfileNameChange={mockHandleProfileNameChange}
            handleProfileActiveChange={mockHandleProfileActiveChange}
            handleSubmit={mockHandleSubmit}
            handleDropDownChange={mockHandleDropDownChange}
            handleSubmitToAssignProjectsToProfile={mockHandleSubmitToAssignProjectsToProfile}
            handleProjectCheckboxChange={mockHandleProjectCheckboxChange}
        />);
        expect(wrapper.find(ListUsersComponent)).toHaveLength(1);
    });
});
