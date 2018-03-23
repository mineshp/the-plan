import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Table } from 'semantic-ui-react';

const ListsSummary = ({ retrieveListBy, rows }) => (
    <div className="List main content-body">
        <Container>
            <Header as="h1" className="firstletter-capitalise">{`Lists for ${retrieveListBy}.`}</Header>
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
    ),
    retrieveListBy: PropTypes.string.isRequired
};

ListsSummary.defaultProps = {
    rows: []
};

export default ListsSummary;
