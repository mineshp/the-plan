import React from 'react';
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';

const calculateColumnWidths = (numOfCols) => {
    const MAX_WIDTH = 12;
    const DEL_AND_COMPLETED_BTN_WIDTH = 1;

    return Math.ceil(MAX_WIDTH / (numOfCols + DEL_AND_COMPLETED_BTN_WIDTH));
};

const ListItemRow = ({ handleChange, handleDelete, handleCompleted, itemRow }) => {
    const row = [];
    const rowProps = {};
    const markAsCompletedClass = itemRow.completed ? 'completed-item' : '';
    itemRow.columns.map((column) => {
        const itemInputKey = `${itemRow.rowId}-${column.columnName}`;
        rowProps.negative = itemRow.completed;
        return row.push(
            <Table.Cell key={itemInputKey} width={calculateColumnWidths(itemRow.columns.length)} {...rowProps}>
                <Input
                    fluid
                    id={itemRow.rowId}
                    name={column.columnName}
                    value={column.columnValue}
                    onChange={handleChange}
                    className={markAsCompletedClass}
                    disabled={rowProps.positive}
                />
            </Table.Cell>
        );
    });

    const markItemAsCompleteBtn = (
        <Button
            icon="unlock"
            color="violet"
            id={itemRow.rowId}
            onClick={handleCompleted}
            title="Item is Active"
        />
    );

    const markItemAsUnCompleteBtn = (
        <Button
            icon="lock"
            color="teal"
            id={itemRow.rowId}
            onClick={handleCompleted}
            title="Item has been Completed"
        />
    );

    const completedBtn = itemRow.completed ? markItemAsUnCompleteBtn : markItemAsCompleteBtn;

    const deleteRowBtnKey = `${itemRow.rowId}-deleteRow`;
    row.push(
        <Table.Cell key={deleteRowBtnKey} width="1" textAlign="right" {...rowProps}>
            { completedBtn }
            <Button
                icon="trash"
                color="pink"
                id={itemRow.rowId}
                onClick={handleDelete}
                title="Delete Item"
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
    handleDelete: PropTypes.func.isRequired,
    handleCompleted: PropTypes.func.isRequired
};

export default ListItemRow;
