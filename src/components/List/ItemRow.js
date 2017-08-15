import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'semantic-ui-react';


const ItemRow = ({ data, listID }) => (
    <Table.Row>
        <Table.Cell>{data.name}</Table.Cell>
        <Table.Cell>{data.createdDate}</Table.Cell>
        <Table.Cell>{data.updatedDate}</Table.Cell>
        <Table.Cell>{data.notes}</Table.Cell>
        <Table.Cell>{data.owner}</Table.Cell>
        <Table.Cell><Button as='a' color='teal' href={`/list/${listID}/item/${data.id}/delete`}>Delete</Button></Table.Cell>
    </Table.Row>
);

ItemRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdDate: PropTypes.string.isRequired,
    updatedDate: PropTypes.string.isRequired
    }).isRequired
}

export default ItemRow;