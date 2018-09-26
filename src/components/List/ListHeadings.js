import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Table } from 'semantic-ui-react';

const ListItems = ({ headings, listId }) => {
    const columnHeadings = [];
    headings.map((heading) => (
        columnHeadings.push(<Table.HeaderCell key={heading.id}>{heading.name}</Table.HeaderCell>)
    ));

    columnHeadings.push(
        <Table.HeaderCell key={'actions'} textAlign="right" colSpan="2">
            <Button
                as={Link}
                icon="edit"
                color="green"
                to={`/list/update/${listId}`}
                title="Amend List Setup"
            />
        </Table.HeaderCell>
    );

    return (
        <Table.Header>
            <Table.Row key={123}>
                {columnHeadings}
            </Table.Row>
        </Table.Header>
    );
};

ListItems.propTypes = {
    headings: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            position: PropTypes.number
        })
    ).isRequired,
    listId: PropTypes.string.isRequired
};

ListItems.defaultProps = {
    headings: []
};

export default ListItems;
