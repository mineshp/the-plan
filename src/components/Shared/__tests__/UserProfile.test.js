import React from 'react';
import renderer from 'react-test-renderer';
import UserProfile from '../UserProfile';
import { mockUser, mockProfileOptions } from '../../../helpers/test/testData/authenticationData';

it('renders correctly', () => {
    const tree = renderer.create(<UserProfile
        profileOptions={mockProfileOptions()}
        profilesAssigned={mockUser().profile}
        handleDropDownSelection={jest.fn()}
        handleSubmit={jest.fn()}
    />).toJSON();
    expect(tree).toMatchSnapshot();
});
