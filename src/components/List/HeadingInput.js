import React from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Form, Grid, Input } from 'semantic-ui-react';

const HeadingInput = ({ headings, handleAddColumn, handleRemoveColumn, handleHeaderInputChange }) => {
    const headerRows = [];
    headings.map((heading) => {
        const headingID = heading.id; // eslint-disable-line no-underscore-dangle
        return (
            headerRows.push(
                <Grid.Row key={headingID}>
                    <Grid.Column>
                        <Form.Field>
                            <Input
                                placeholder="Header Name..."
                                name={heading.name}
                                id={headingID}
                                key={headingID}
                                defaultValue={heading.name}
                                onChange={handleHeaderInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                        <Form.Field>
                            <Input
                                placeholder="Position..."
                                name={heading.position}
                                id={headingID}
                                key={headingID}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                        <Button
                            icon="trash"
                            content="Remove"
                            labelPosition="left"
                            id={headingID}
                            color="pink"
                            type="button"
                            onClick={handleRemoveColumn}
                        />
                    </Grid.Column>
                </Grid.Row>
            )
        );
    });

    return (
        <div>
            <Grid columns={3} divided>
                <Divider horizontal>COLUMNS</Divider>
                {headerRows}
                <Divider />
                <Button fluid type="button" color="blue" onClick={handleAddColumn}>Add Column</Button>
            </Grid>

        </div>
    );
};

HeadingInput.propTypes = {
    headings: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        }).isRequired
    ).isRequired,
    handleAddColumn: PropTypes.func.isRequired,
    handleRemoveColumn: PropTypes.func.isRequired,
    handleHeaderInputChange: PropTypes.func.isRequired
};

export default HeadingInput;
