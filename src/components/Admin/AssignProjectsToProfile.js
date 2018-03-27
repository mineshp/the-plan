import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Container, Form, Select } from 'semantic-ui-react';

const AssignProjectsToProfile = ({
    handleSubmitToAssignProjectsToProfile,
    handleProjectCheckboxChange,
    handleDropDownChange,
    profiles,
    projects
}) => {
    const DropDownProfileItems = [];
    profiles.map((profile) => DropDownProfileItems.push({
        key: profile._id, // eslint-disable-line no-underscore-dangle
        value: profile.name,
        text: profile.name.toUpperCase()
    }));

    const CheckBoxItems = [];
    projects.map((project) => {
        // eslint-disable-next-line no-underscore-dangle
        const projectId = project._id;

        return CheckBoxItems.push(
            <Form.Field key={projectId}>
                <Checkbox
                    label={project.projectName}
                    id={projectId}
                    data-projcb={project}
                    onChange={handleProjectCheckboxChange}
                />
            </Form.Field>
        );
    });

    return (
        <Container>
            <Form onSubmit={handleSubmitToAssignProjectsToProfile}>
                <Form.Field>
                    <Select
                        placeholder="Select Profile"
                        className="form-dropdown"
                        options={DropDownProfileItems}
                        onChange={handleDropDownChange}
                    />
                </Form.Field>
                {CheckBoxItems}
                <Button color="green" type="submit">Save</Button>
            </Form>
        </Container>
    );
};

AssignProjectsToProfile.propTypes = {
    handleDropDownChange: PropTypes.func.isRequired,
    handleSubmitToAssignProjectsToProfile: PropTypes.func.isRequired,
    handleProjectCheckboxChange: PropTypes.func.isRequired,
    profiles: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired
    })).isRequired,
    projects: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        projectName: PropTypes.string.isRequired,
    })).isRequired
};

export default AssignProjectsToProfile;
