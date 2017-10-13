import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const ListHeadings = ({ headings }) => {
    const columnHeadings = [];
    headings.map((heading) => (
        columnHeadings.push(<Table.HeaderCell key={heading.id}>{heading.name}</Table.HeaderCell>)
    ));

    return (
        <Table.Header>
            <Table.Row key={123}>
                {columnHeadings}
            </Table.Row>
        </Table.Header>
    );
};

ListHeadings.propTypes = {
    headings: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            position: PropTypes.number.isRequired
        })
    ).isRequired
};

ListHeadings.defaultProps = {
    headings: []
};

export default ListHeadings;
