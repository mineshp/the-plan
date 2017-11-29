import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon } from 'semantic-ui-react';

const ListFooter = ({ numColumns, handleAddItem, handleSubmit }) => (
    <Table.Footer fullWidth>
        <Table.Row>
            <Table.HeaderCell colSpan={numColumns}>
                <Button floated="left" color="blue" icon labelPosition="left" size="small" onClick={handleAddItem}>
                    <Icon name="plus" /> Add Item
                </Button>
                <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    color="green"
                    size="small"
                    onClick={handleSubmit}
                >
                    <Icon name="save" /> Save
                </Button>
            </Table.HeaderCell>
        </Table.Row>
    </Table.Footer>
);

ListFooter.propTypes = {
    numColumns: PropTypes.number.isRequired,
    handleAddItem: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default ListFooter;
