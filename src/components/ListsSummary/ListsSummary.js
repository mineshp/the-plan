import React from 'react';
import PropTypes from 'prop-types';
import { Container, Table } from 'semantic-ui-react';
import DisplayMessage from '../Shared/DisplayMessage';

const ListsSummary = ({
    errors,
    rows
}) => (
    <div className="List main">
        {
            (errors && errors.error) &&
                <DisplayMessage status={errors} />
        }
        <Container>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Created</Table.HeaderCell>
                        <Table.HeaderCell>Last Updated</Table.HeaderCell>
                        <Table.HeaderCell>Projects</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        </Container>
    </div>
);

ListsSummary.propTypes = {
    errors: PropTypes.shape({}),
    rows: PropTypes.arrayOf(
        PropTypes.shape({})
    )
};

ListsSummary.defaultProps = {
    errors: null,
    rows: []
};

export default ListsSummary;
