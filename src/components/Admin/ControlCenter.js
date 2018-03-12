import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';
import ListUsers from './ListUsers';

const ControlCenter = ({ handleResetPwd, handleDeleteUser, users }) => {
    return (
        <Container>
            <Header as="h1">Control Center</Header>
            <ListUsers
                users={users}
                handleDeleteUser={handleDeleteUser}
                handleResetPwd={handleResetPwd}
            />
        </Container>
    );
};

ControlCenter.propTypes = {
    handleDeleteUser: PropTypes.func.isRequired,
    handleResetPwd: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    })).isRequired
};

ControlCenter.defaultProps = {
    users: null
};

export default ControlCenter;
