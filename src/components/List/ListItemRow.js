import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Table } from 'semantic-ui-react';

const calculateColumnWidths = (numOfCols) => {
    const MAX_WIDTH = 12;
    const DEL_BTN_WIDTH = 1;
    const COMPLETED_BTN_WIDTH = 1;

    return Math.ceil(MAX_WIDTH / (numOfCols + DEL_BTN_WIDTH + COMPLETED_BTN_WIDTH));
};

const ListItemRow = ({ handleChange, handleDelete, handleCompleted, itemRow }) => {
    const row = [];
    const rowProps = {};
    const markAsCompletedClass = itemRow.completed ? 'completed-item' : '';
    itemRow.columns.map((column) => {
        const itemInputKey = `${itemRow.rowId}-${column.columnName}`;
        rowProps.positive = itemRow.completed;
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

    const completedItemRowBtnKey = `${itemRow.rowId}-completedRow`;
    const markItemAsCompleteBtn = (
        <Button
            icon="thumbs up"
            color="yellow"
            id={itemRow.rowId}
            onClick={handleCompleted}
        />
    );

    const markItemAsUnCompleteBtn = (
        <Button
            icon="check"
            color="green"
            id={itemRow.rowId}
            onClick={handleCompleted}
        />
    );

    const completedBtn = itemRow.completed ? markItemAsUnCompleteBtn : markItemAsCompleteBtn;

    row.push(
        <Table.Cell key={completedItemRowBtnKey} width="1" textAlign="right" {...rowProps}>
            { completedBtn }
        </Table.Cell>
    );

    const deleteRowBtnKey = `${itemRow.rowId}-deleteRow`;
    row.push(
        <Table.Cell key={deleteRowBtnKey} width="1" textAlign="right" {...rowProps}>
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
    handleDelete: PropTypes.func.isRequired,
    handleCompleted: PropTypes.func.isRequired
};

export default ListItemRow;
