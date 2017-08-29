import React from 'react';
import DisplayMessage from '../DisplayMessage';
import renderer from 'react-test-renderer';
const { shallow } = require('enzyme');

it('renders a success message', () => {
    const successfulResult = {
        success: {
            message: 'Successful request',
        }
    };

    const tree = renderer.create(
        <DisplayMessage status={successfulResult}></DisplayMessage>
    ).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.props.className).toContain('olive');
});

it('renders an error message', () => {
    const errorResult = {
        error: {
            message: 'Error request',
            isError: true
        }
    };

    const tree = renderer.create(
        <DisplayMessage status={errorResult}></DisplayMessage>
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree.props.className).toContain('red');
});