import React from 'react';
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

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
