import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const DisplayMessage = (props) => {
    let isError = false;

    if (props.status.isError) {
        isError = props.status.isError;
    }

    const color = isError
        ? 'red'
        : 'olive';

    const message = props.status.message;

    return (
        <Message color={color}>
            <p>{message}</p>
        </Message>

    );
};

// Take one object with a messageType field ['success', 'error']
DisplayMessage.propTypes = {
    status: PropTypes.shape({
        isError: PropTypes.bool,
        message: PropTypes.string
        // success: PropTypes.shape({
        //     message: PropTypes.string
        // }),
        // error: PropTypes.shape({
        //     message: PropTypes.string,
        //     isError: PropTypes.bool
        // })
    }).isRequired
};

export default DisplayMessage;
