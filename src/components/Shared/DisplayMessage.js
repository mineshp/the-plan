import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DisplayMessage = (props) => {
    let isError = false;

    // TODO check other success and error messages
    if (props.status.error && props.status.error.isError) {
        isError = props.status.error.isError;
    }

    const color = isError
        ? 'red'
        : 'olive';

    const message = (props.status.error && props.status.error.message)
        ? props.status.error.message
        : props.status.success.message;

    return (
        <Message color={color}>
            <p>{message}</p>
        </Message>

    );
};

// Take one object with a messageType field ['success', 'error']
DisplayMessage.propTypes = {
    status: PropTypes.shape({
        error: PropTypes.shape({
            isError: PropTypes.bool,
            message: PropTypes.string
        }),
        success: PropTypes.shape({
            message: PropTypes.string
        })
    }).isRequired
};

export default DisplayMessage;
