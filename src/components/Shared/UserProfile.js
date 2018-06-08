import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, Header, Select } from 'semantic-ui-react';

const UserProfile = ({
    profilesAssigned,
    profileOptions,
    handleDropDownSelection,
    handleSubmit
}) => (
    <div className="List main content-body">
        <Container>
            <Header as="h1">Select Profile(s) to access</Header>
            <p>
                This sets the profiles available for you to access, the dropdown provides all possible profiles you have access to. All projects are assigned to a profile, so if you do not select the correct profiles you may not see what you are expecting.
            </p>
            <Form onSubmit={handleSubmit}>
                <Select
                    placeholder="Profiles"
                    fluid
                    multiple
                    search
                    selection
                    options={profileOptions}
                    onChange={handleDropDownSelection}
                    defaultValue={profilesAssigned}
                />
                <hr />
                <Button color="green" type="submit">Save</Button>
            </Form>

        </Container>
    </div>
);

UserProfile.propTypes = {
    handleDropDownSelection: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    profileOptions: PropTypes.arrayOf(PropTypes.shape({})),
    profilesAssigned: PropTypes.arrayOf(PropTypes.string)
};

UserProfile.defaultProps = {
    profileOptions: [],
    profilesAssigned: []
};

export default UserProfile;

