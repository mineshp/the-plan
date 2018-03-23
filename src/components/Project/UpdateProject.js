import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import ColourDropDown from '../../components/Shared/ColourDropDown';

const UpdateProject = ({
    result,
    handleSubmit,
    handleChange,
    handleProjectDescriptionChange,
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
                <Button color="green" type="submit">Save</Button>
            </Form>
        </Container>
    );

UpdateProject.propTypes = {
    result: PropTypes.shape({}),
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleProjectDescriptionChange: PropTypes.func.isRequired,
    handleDropDownSelection: PropTypes.func.isRequired
};

UpdateProject.defaultProps = {
    result: {}
};


export default UpdateProject;
