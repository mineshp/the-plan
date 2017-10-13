import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import ListItemRow from './ListItemRow';

const ListItems = ({ items }) => {
    const listItemRows = [];
    items.map((listRowObj) => (
        listItemRows.push(<ListItemRow key={listRowObj.id} itemRow={listRowObj.columns} />)
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
    ).isRequired
};

export default ListItems;
