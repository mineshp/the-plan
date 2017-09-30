import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import DisplayMessage from '../Shared/DisplayMessage';
import ColourDropDown from '../../components/Shared/ColourDropDown';

const CreateProject = ({
    result,
    handleSubmit,
    projectName,
    handleChange,
    handleDropDownSelection
}) => (
    <Container>
        {
            (result.error || result.success) &&
            <DisplayMessage status={result} />
        }
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <Input
                    placeholder="Project Name..."
                    className="text-box-custom"
                    defaultValue={projectName}
                    onChange={handleChange}
                />
            </Form.Field>
            <Form.Field>
                <ColourDropDown handleChange={handleDropDownSelection} />
            </Form.Field>
            <Button color="teal" type="submit">Create</Button>
        </Form>
    </Container>
);

CreateProject.propTypes = {
    result: PropTypes.shape({}).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleDropDownSelection: PropTypes.func.isRequired,
    projectName: PropTypes.string
};

CreateProject.defaultProps = {
    projectName: undefined
};

export default CreateProject;
