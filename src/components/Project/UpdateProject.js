import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import DisplayMessage from '../Shared/DisplayMessage';
import ColourDropDown from '../../components/Shared/ColourDropDown';

const UpdateProject = ({
    result,
    handleSubmit,
    handleChange,
    handleDropDownSelection
}) =>
    (
        <Container>
            {
                (result && (result.error || result.success)) &&
                <DisplayMessage status={result} />
            }
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <Input
                        placeholder="Project Name..."
                        className="text-box-custom"
                        defaultValue={result.projectName}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <ColourDropDown value={result.colour} handleChange={handleDropDownSelection} />
                </Form.Field>
                <Button color="teal" type="submit">Save</Button>
            </Form>
        </Container>
    );

UpdateProject.propTypes = {
    result: PropTypes.shape({}),
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleDropDownSelection: PropTypes.func.isRequired
};

UpdateProject.defaultProps = {
    result: {}
};


export default UpdateProject;
