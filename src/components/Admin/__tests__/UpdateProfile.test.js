import React from 'react';
import renderer from 'react-test-renderer';
import UpdateProfileComponent from '../UpdateProfile';

const mockHandleSubmit = jest.fn();
const mockHandleProfileNameChange = jest.fn();
const mockHandleProfileActiveChange = jest.fn();

describe('Admin > Manage > CreateProfiles', () => {
    it('renders Create Profile component', () => {
        const tree = renderer.create(
            <UpdateProfileComponent
                handleSubmit={mockHandleSubmit}
                handleProfileNameChange={mockHandleProfileNameChange}
                handleProfileActiveChange={mockHandleProfileActiveChange}
            />
        );
        expect(tree).toMatchSnapshot();
    });
});
