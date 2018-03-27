import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Container, Form, Input } from 'semantic-ui-react';


const UpdateProfile = ({
    handleProfileNameChange,
    handleProfileActiveChange,
    handleSubmit
}) => (
    <Container>
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <Input
                    placeholder="Profile Name..."
                    className="text-box-single-col-min"
                    defaultValue=""
                    onChange={handleProfileNameChange}
                />
            </Form.Field>
            <Form.Field
                control={Checkbox}
                name="activeProfile"
                onChange={handleProfileActiveChange}
                label={{ children: 'Profile Active' }}
            />
            <Button color="green" type="submit">Save</Button>
        </Form>
    </Container>
);

UpdateProfile.propTypes = {
    handleProfileNameChange: PropTypes.func.isRequired,
    handleProfileActiveChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default UpdateProfile;
