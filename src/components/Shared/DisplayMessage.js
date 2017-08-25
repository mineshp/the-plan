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

DisplayMessage.propTypes = {
    status: PropTypes.shape({
        exists: PropTypes.boolean,
        message: PropTypes.string,
        data: PropTypes.shape({
            projectName: PropTypes.string,
            colour: PropTypes.string
        })
    })
}

export default DisplayMessage;