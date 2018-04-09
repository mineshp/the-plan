import React from 'react';
import renderer from 'react-test-renderer';
import CheckBoxGroup from '../CheckBoxGroup';
import { mockListProfiles } from '../../../helpers/test/testData/controlCentreData';

const mockProfiles = mockListProfiles();

it('renders correctly for an item that is not set to checked as default', () => {
    const handleCheckBoxChange = jest.fn();

    const tree = renderer.create(<CheckBoxGroup
        data={mockProfiles}
        handleCheckBoxChange={handleCheckBoxChange}
        assigned={[]}
    />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly for an item that is set to checked as default', () => {
    const handleCheckBoxChange = jest.fn();

    const tree = renderer.create(<CheckBoxGroup
        data={mockProfiles}
        handleCheckBoxChange={handleCheckBoxChange}
        assigned={['profileX', 'HOME_DIY']}
    />).toJSON();
    expect(tree).toMatchSnapshot();
});
