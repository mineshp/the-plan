import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';


// Message Structure
/*

props.message

message: {
    color: '',
    icon: '',
    message: '',
    isError: 1
}

<DisplayMessage colour={} icon={} message={} isError={} />

*/

const DisplayMessage = (props) => {
    let isError = false;

    // TODO check other success and error messages
    if (props.status.error && props.status.error.isError) {
        isError = props.status.error.isError;
    }

    let color = isError
        ? 'red'
        : 'olive';

    // Override colour if passed in.
    if (props.colour) {
        color = props.colour;
    }

    // TODO: Refactor this module so its cleaner
    let message;
    if (props.status.error && props.status.error.message) {
        message = props.status.error.message;
    } else if (props.status.success && props.status.success.message) {
        message = props.status.success.message;
    } else {
        message = props.status.warning.message;
    }

    // const message = (props.status.error && props.status.error.message)
    //     ? props.status.error.message
    //     : props.status.success.message;

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
        }),
        warning: PropTypes.shape({
            message: PropTypes.string
        }),
    }).isRequired,
    colour: PropTypes.string
};

DisplayMessage.defaultProps = {
    colour: null
};

export default DisplayMessage;
