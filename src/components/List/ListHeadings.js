import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const ListItems = ({ headings }) => {
    const columnHeadings = [];
    headings.map((heading) => (
        columnHeadings.push(<Table.HeaderCell key={heading.id}>{heading.name}</Table.HeaderCell>)
    ));

    columnHeadings.push(<Table.HeaderCell key={'actions'} />);

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
    ).isRequired
};

ListItems.defaultProps = {
    headings: []
};

export default ListItems;
