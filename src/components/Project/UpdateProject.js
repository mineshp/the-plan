import React from 'react';
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import ColourDropDown from '../../components/Shared/ColourDropDown';
import CheckBoxGroup from '../Shared/CheckBoxGroup';

const UpdateProject = ({
    result,
    profiles,
    handleSubmit,
    handleChange,
    handleProjectDescriptionChange,
    handleCheckboxSelectionForProfiles,
    handleDropDownSelection,
    profilesAssigned
}) => {
    const assigned = profilesAssigned && profilesAssigned.length > 0
        ? profilesAssigned
        : result.profilesAssigned || [];

    return (
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
                    assigned={assigned}
                    handleCheckBoxChange={handleCheckboxSelectionForProfiles}
                />
                <Button color="green" type="submit">Save</Button>
            </Form>
        </Container>
    );
};

UpdateProject.propTypes = {
    result: PropTypes.shape({}).isRequired,
    profiles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleProjectDescriptionChange: PropTypes.func.isRequired,
    handleDropDownSelection: PropTypes.func.isRequired,
    handleCheckboxSelectionForProfiles: PropTypes.func.isRequired,
    profilesAssigned: PropTypes.arrayOf(PropTypes.string)
};

UpdateProject.defaultProps = {
    result: {},
    profilesAssigned: []
};


export default UpdateProject;
