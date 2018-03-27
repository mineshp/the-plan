import React from 'react';
import renderer from 'react-test-renderer';
import ViewProfilesComponent from '../ViewProfiles';
import { mockListProfiles } from '../../../helpers/test/testData/controlCentreData';

const mockHandleDeleteProfile = jest.fn();
const mockHandleProfileStatus = jest.fn();

describe('Admin > Manage > ViewProfiles', () => {
    const mockProfiles = mockListProfiles();
    it('renders ListUsers component', () => {
        const tree = renderer.create(
            <ViewProfilesComponent
                profiles={mockProfiles}
                handleDeleteProfile={mockHandleDeleteProfile}
                handleProfileStatus={mockHandleProfileStatus}
            />
        );
        expect(tree).toMatchSnapshot();
    });
});
