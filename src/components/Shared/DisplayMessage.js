import React from 'react';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import PropTypes from 'prop-types';

const DisplayMessage = (props) => {
    const { colour, icon, message, header } = props.data;

    return (
        <Message
            icon={icon}
            header={header}
            content={message}
            color={colour}
        />
    );
};

// Take one object with a messageType field ['success', 'error']
DisplayMessage.propTypes = {
    data: PropTypes.shape({
        colour: PropTypes.string,
        icon: PropTypes.string,
        header: PropTypes.string,
        message: PropTypes.string.isRequired
    }).isRequired
};

DisplayMessage.defaultProps = {
    data: {
        colour: null,
        icon: null,
        header: 'Info'
    }
};

export default DisplayMessage;
