import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import ColourDropDown from '../../components/Shared/ColourDropDown';
import CheckBoxGroup from '../Shared/CheckBoxGroup';

const UpdateProject = ({
    result,
    profiles,
    handleSubmit,
    handleChange,
    handleProjectDescriptionChange,
    handleCheckboxSelectionForProfiles,
    handleDropDownSelection
}) =>
    (
        <Container className="content-body">
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <Input
                        placeholder="Project Name..."
                        className="text-box-single-col-min"
                        defaultValue={result.projectName}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Input
                        placeholder="Project Description..."
                        className="text-box-single-col-min"
                        defaultValue={result.projectDescription}
                        onChange={handleProjectDescriptionChange}
                    />
                </Form.Field>
                <Form.Field>
                    <ColourDropDown value={result.colour} handleChange={handleDropDownSelection} />
                </Form.Field>
                <CheckBoxGroup
                    data={profiles}
                    assigned={result.profiles}
                    handleCheckBoxChange={handleCheckboxSelectionForProfiles}
                />
                <Button color="green" type="submit">Save</Button>
            </Form>
        </Container>
    );

UpdateProject.propTypes = {
    result: PropTypes.shape({}),
    profiles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleProjectDescriptionChange: PropTypes.func.isRequired,
    handleDropDownSelection: PropTypes.func.isRequired,
    handleCheckboxSelectionForProfiles: PropTypes.func.isRequired
};

UpdateProject.defaultProps = {
    result: {}
};


export default UpdateProject;
