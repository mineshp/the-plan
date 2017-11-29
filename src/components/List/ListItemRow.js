import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Table } from 'semantic-ui-react';

const ListItemRow = ({ handleChange, handleDelete, itemRow }) => {
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

    const deleteRowBtnKey = `${itemRow.rowId}-deleteRow`;
    row.push(
        <Table.Cell key={deleteRowBtnKey} width="6" textAlign="right">
            <Button
                icon="trash"
                color="pink"
                id={itemRow.rowId}
                onClick={handleDelete}
            />
        </Table.Cell>
    );

    return (
        <Table.Row>
            {row}
        </Table.Row>
    );
};

ListItemRow.propTypes = {
    itemRow: PropTypes.shape({}).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default ListItemRow;
