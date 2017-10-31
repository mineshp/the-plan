import React from 'react';
import renderer from 'react-test-renderer';
import DisplayMessage from '../DisplayMessage';

describe('DisplayMessage', () => {
    it('renders a message', () => {
        const data = {
            icon: 'checkmark',
            header: 'Success',
            message: 'Congratulations you have a message notification, yay!',
            colour: 'olive'
        };

        renderer.create(
            <DisplayMessage
                data={data}
            />
        ).toJSON();
    });
});
