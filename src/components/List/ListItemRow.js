import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const ListItemRow = ({ itemRow }) => {
    const row = [];

    itemRow.map((columnObj) => (
        row.push(<Table.Cell key={columnObj.columnId}>{columnObj.columnValue}</Table.Cell>)
    ));

    return (
        <Table.Row>
            {row}
        </Table.Row>
    );
};

ListItemRow.propTypes = {
    itemRow: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired
};

export default ListItemRow;
