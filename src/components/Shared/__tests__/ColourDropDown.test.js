import React from 'react';
import renderer from 'react-test-renderer';
import ColourDropDown from '../ColourDropDown';

it('renders correctly', () => {
    const handleChange = jest.fn();

    const tree = renderer.create(<ColourDropDown handleChange={handleChange} />).toJSON();
    expect(tree).toMatchSnapshot();
});
