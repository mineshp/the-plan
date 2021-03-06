import React from 'react';
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';

const ListUsers = ({ handleDeleteUser, handleResetPwd, users }) => {
    const userRows = [];
    users.map((user) => {
        const profilesAssignedLabels = user.profile.slice(0, 5).map((profile) => (
            <Label
                as="a"
                key={`${user.id}-${profile}`}
                color="pink"
            > {profile}
            </Label>
        ));

        const disableAction = user.isAdmin ? user.isAdmin : null;
        const userId = user.id; // eslint-disable-line no-underscore-dangle
        return userRows.push(
            <Table.Row key={`user-${user.username}`} warning={user.isAdmin} >
                <Table.Cell collapsing>
                    <Icon name={user.isAdmin ? 'graduation' : 'user'} /> {user.username}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{profilesAssignedLabels}</Table.Cell>
                <Table.Cell collapsing>
                    <Button color="green" size="small" id={userId} onClick={handleResetPwd}>
                        Reset Password
                    </Button>
                </Table.Cell>
                <Table.Cell collapsing>
                    <Button color="pink" size="small" disabled={disableAction} id={userId} onClick={handleDeleteUser}>
                        Delete User
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    });

    return (
        <Container>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Profiles Assigned</Table.HeaderCell>
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
