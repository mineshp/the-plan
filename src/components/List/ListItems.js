import React from 'react';
import PropTypes from 'prop-types';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import ListItemRow from './ListItemRow';

const ListItems = ({ items, handleChange, handleDelete, handleCompleted }) => {
    const listItemRows = [];
    items.map((listRowObj) => (
        listItemRows.push(
            <ListItemRow
                key={listRowObj.rowId}
                itemRow={listRowObj}
                handleChange={handleChange}
                handleDelete={handleDelete}
                handleCompleted={handleCompleted}
            />
        )
    ));

    return (
        <Table.Body>
            {listItemRows}
        </Table.Body>
    );
};

ListItems.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleCompleted: PropTypes.func.isRequired
};

export default ListItems;
