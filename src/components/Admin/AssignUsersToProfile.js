import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, Select } from 'semantic-ui-react';
import CheckBoxGroup from '../Shared/CheckBoxGroup';

const AssignUsersToProfile = ({
    handleSubmitToAssignUsersToProfile,
    handleProfilesCheckboxChange,
    handleUsersDropDownChange,
    profiles,
    users,
    userProfilesAssigned
}) => {
    const DropDownUserItems = [];
    users.map((user) => DropDownUserItems.push({
        key: user._id, // eslint-disable-line no-underscore-dangle
        value: user.username,
        text: user.username.toUpperCase()
    }));

    return (
        <Container>
            <Form onSubmit={handleSubmitToAssignUsersToProfile}>
                <Form.Field>
                    <Select
                        placeholder="Select User"
                        className="form-dropdown"
                        options={DropDownUserItems}
                        onChange={handleUsersDropDownChange}
                    />
                </Form.Field>
                <CheckBoxGroup
                    data={profiles}
                    assigned={userProfilesAssigned}
                    handleCheckBoxChange={handleProfilesCheckboxChange}
                />
                <Button color="green" type="submit">Save</Button>
            </Form>
        </Container>
    );
};

AssignUsersToProfile.propTypes = {
    handleUsersDropDownChange: PropTypes.func.isRequired,
    handleSubmitToAssignUsersToProfile: PropTypes.func.isRequired,
    handleProfilesCheckboxChange: PropTypes.func.isRequired,
    profiles: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    })).isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    })).isRequired,
    userProfilesAssigned: PropTypes.arrayOf(PropTypes.string)
};

AssignUsersToProfile.defaultProps = {
    userProfilesAssigned: []
};

export default AssignUsersToProfile;
