import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Icon, Table } from 'semantic-ui-react';


const ListUsers = ({ handleDeleteUser, handleResetPwd, users }) => {
    const userRows = [];
    users.map((user) => {
        const userId = user._id; // eslint-disable-line no-underscore-dangle
        return userRows.push(
            <Table.Row key={`user-${user.username}`}>
                <Table.Cell collapsing>
                    <Icon name={user.isAdmin ? 'graduation' : 'user'} /> {user.username}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell collapsing>
                    <Button color="green" size="small" id={userId} onClick={handleResetPwd}>
                        Reset Password
                    </Button>
                </Table.Cell>
                <Table.Cell collapsing>
                    <Button color="pink" size="small" onClick={handleDeleteUser}>
                        Delete User
                    </Button>
                </Table.Cell>
            </Table.Row>
        )
    });

    return (
        <Container>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Password</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {userRows}
                </Table.Body>
            </Table>
        </Container>
    );
};

ListUsers.propTypes = {
    handleDeleteUser: PropTypes.func.isRequired,
    handleResetPwd: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool.isRequired
    })).isRequired
};

export default ListUsers;
