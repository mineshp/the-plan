import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Select, Form, Grid, Header, Input } from 'semantic-ui-react';
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
        result.projects.map((project) => (
            projectsAlreadyAssignedToList.push(project.name)
        ));
    }

    return (
        <Container>
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
