import React from 'react';
import { Message } from 'semantic-ui-react'
import PropTypes from 'prop-types';

const DisplayMessage = (props) => {
    let isError = false;
    if (props.status.error) {
        isError = props.status.error.isError;
    }

    let color = isError
        ? 'red'
        : 'olive';

    let message = isError
        ? props.status.error.message
        : props.status.success.message

    return (
        <Message color={color}>
            <p>{message}</p>
        </Message>

    );
};

// Take one object with a messageType field ['success', 'error']
DisplayMessage.propTypes = {
    status: PropTypes.shape({
        success: PropTypes.shape({
            message: PropTypes.string
        }),
        error: PropTypes.shape({
            message: PropTypes.string,
            isError: PropTypes.bool
        })
    })
}

export default DisplayMessage;