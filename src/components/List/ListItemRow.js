import React from 'react';
import PropTypes from 'prop-types';
import { Input, Table } from 'semantic-ui-react';

const ListItemRow = ({ handleChange, itemRow }) => {
    const row = [];
    itemRow.columns.map((column) => {
        const itemInputKey = `${itemRow.rowId}-${column.columnName}`;
        return row.push(
            <Table.Cell key={itemInputKey} width="6">
                <Input
                    fluid
                    id={itemRow.rowId}
                    name={column.columnName}
                    value={column.columnValue}
                    onChange={handleChange}
                />
            </Table.Cell>
        );
    });

    return (
        <Table.Row>
            {row}
        </Table.Row>
    );
};

ListItemRow.propTypes = {
    itemRow: PropTypes.shape({}).isRequired,
    handleChange: PropTypes.func.isRequired
};

export default ListItemRow;
