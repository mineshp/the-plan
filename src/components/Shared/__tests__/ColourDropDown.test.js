import React from 'react';
import ColourDropDown from '../ColourDropDown';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const handleChange = jest.fn();

    const tree = renderer.create(
        <ColourDropDown handleChange={handleChange}></ColourDropDown>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});