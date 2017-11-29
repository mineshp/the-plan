import React from 'react';
import PropTypes from 'prop-types';
import { Container, Table } from 'semantic-ui-react';

const ListsSummary = ({ rows }) => (
    <div className="List main">
        <Container>
            <Table striped>
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
    rows: PropTypes.arrayOf(
        PropTypes.shape({})
    )
};

ListsSummary.defaultProps = {
    rows: []
};

export default ListsSummary;
