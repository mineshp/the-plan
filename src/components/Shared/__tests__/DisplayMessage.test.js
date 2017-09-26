import React from 'react';
import renderer from 'react-test-renderer';
import DisplayMessage from '../DisplayMessage';

it('renders a success message', () => {
    const successfulResult = {
        success: {
            message: 'Successful request',
        }
    };

    const tree = renderer.create(<DisplayMessage status={successfulResult} />).toJSON();
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

    const tree = renderer.create(<DisplayMessage status={errorResult} />).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree.props.className).toContain('red');
});
