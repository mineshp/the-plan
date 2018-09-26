import React from 'react';
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Select from 'semantic-ui-react/dist/commonjs/addons/Select';
import HeadingInput from './HeadingInput';
import './List.css';

const UpdateList = ({
    projectOptions,
    result,
    handleSubmit,
    handleChange,
    handleDropDownSelection,
    handleHeaderInputChange,
    addHeading,
    removeHeading,
    headings
}) => {
    const projectsAlreadyAssignedToList = [];
    const heading = (result.listName)
        ? `Update ${result.listName}`
        : 'Setup List';

    if (result.projects) {
        result.projects.slice(0, 3).map((project) => (
            projectsAlreadyAssignedToList.push(project.name)
        ));
    }

    return (
        <Container className="content-body">
            <Header as="h1">{heading}</Header>
            <Form onSubmit={handleSubmit}>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <Input
                                    placeholder="List Name..."
                                    className="text-box-single-col-max"
                                    defaultValue={result.listName}
                                    onChange={handleChange}
                                />
                            </Form.Field>
                            <Divider horizontal>ASSIGN LIST TO PROJECTS</Divider>
                            <Form.Field>
                                <Select
                                    placeholder="Projects"
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={projectOptions}
                                    onChange={handleDropDownSelection}
                                    defaultValue={projectsAlreadyAssignedToList}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <HeadingInput
                    headings={headings}
                    handleAddColumn={addHeading}
                    handleRemoveColumn={removeHeading}
                    handleHeaderInputChange={handleHeaderInputChange}
                />
                <Grid columns={1}>
                    <Grid.Row>
                        <Button fluid className="formSpacing" color="green" type="submit">Save</Button>
                    </Grid.Row>
                </Grid>
            </Form>
        </Container>
    );
};

UpdateList.propTypes = {
    projectOptions: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired,
    result: PropTypes.shape({
        projects: PropTypes.arrayOf(
            PropTypes.shape({})
        )
    }),
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleDropDownSelection: PropTypes.func.isRequired,
    handleHeaderInputChange: PropTypes.func.isRequired,
    addHeading: PropTypes.func.isRequired,
    removeHeading: PropTypes.func.isRequired,
    headings: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string
    }).isRequired).isRequired
};

UpdateList.defaultProps = {
    result: {}
};


export default UpdateList;
