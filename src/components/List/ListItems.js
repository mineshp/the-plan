import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import ListItemRow from './ListItemRow';

const ListItems = ({ items, handleChange }) => {
    const listItemRows = [];
    items.map((listRowObj) => (
        listItemRows.push(
            <ListItemRow
                key={listRowObj.rowId}
                itemRow={listRowObj}
                handleChange={handleChange}
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
    handleChange: PropTypes.func.isRequired
};

export default ListItems;
