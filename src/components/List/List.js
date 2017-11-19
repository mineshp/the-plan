import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Icon, Table } from 'semantic-ui-react';
import ListHeadings from './ListHeadings';
import ListItems from './ListItems';

const List = ({ handleAddItem, handleChange, handleDelete, handleSubmit, items, list }) => (
    <div className="List main">
        <Container>
            <Table celled striped>
                <ListHeadings headings={list.headings} />
                <ListItems
                    items={items}
                    handleChange={handleChange}
                    handleDelete={handleDelete}
                />
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Button floated="left" icon labelPosition="left" size="small" onClick={handleAddItem}>
                                <Icon name="plus" /> Add Item
                            </Button>
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Button
                                floated="right"
                                icon
                                labelPosition="left"
                                color="teal"
                                size="small"
                                onClick={handleSubmit}
                            >
                                <Icon name="save" /> Save
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Container>
    </div>
);

List.propTypes = {
    list: PropTypes.shape({}).isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired,
    handleAddItem: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

List.defaultProps = {
    list: {
        projects: [],
        headings: [],
        items: [],
        rows: []
    }
};

export default List;
