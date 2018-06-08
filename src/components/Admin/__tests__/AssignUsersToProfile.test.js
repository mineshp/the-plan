import React from 'react';
import renderer from 'react-test-renderer';
import AssignUsersToProfile from '../AssignUsersToProfile';
import { mockListProfiles, mockListUsers } from '../../../helpers/test/testData/controlCentreData';

const mockHandleSubmitToAssignUsersToProfile = jest.fn();
const mockHandleUsersDropDownChange = jest.fn();
const mockHandleProfilesCheckboxChange = jest.fn();

describe('Admin > Manage > AssignUsersToProfile', () => {
    const mockProfiles = mockListProfiles();
    const mockUsers = mockListUsers();
    it('renders ListUsers component', () => {
        const tree = renderer.create(
            <AssignUsersToProfile
                profiles={mockProfiles}
                users={mockUsers}
                handleSubmitToAssignUsersToProfile={mockHandleSubmitToAssignUsersToProfile}
                handleUsersDropDownChange={mockHandleUsersDropDownChange}
                handleProfilesCheckboxChange={mockHandleProfilesCheckboxChange}
            />
        );
        expect(tree).toMatchSnapshot();
    });
});
