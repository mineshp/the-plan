import React from 'react';
import PropTypes from 'prop-types';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import ListHeadings from './ListHeadings';
import ListItems from './ListItems';
import ListFooter from './ListFooter';
import ListDetails from './ListDetails';

const List = ({
    handleAddItem, handleChange, handleDelete,
    handleSubmit, handleCompleted, items, list
}) => {
    const numColumns = list.headings.length + 2;
    const listId = list._id; // eslint-disable-line no-underscore-dangle
    return (
        <div className="List main content-body">
            <Container>
                <Header as="h1">{list.listName}</Header>
                <ListDetails list={list} />
                <Table striped>
                    <ListHeadings listId={listId} headings={list.headings} />
                    <ListItems
                        items={items}
                        handleChange={handleChange}
                        handleDelete={handleDelete}
                        handleCompleted={handleCompleted}
                    />
                    <ListFooter
                        numColumns={numColumns}
                        handleAddItem={handleAddItem}
                        handleSubmit={handleSubmit}
                    />
                </Table>
            </Container>
        </div>
    );
};

List.propTypes = {
    list: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        headings: PropTypes.arrayOf(PropTypes.shape({})).isRequired
    }).isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({})
    ).isRequired,
    handleAddItem: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCompleted: PropTypes.func.isRequired
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
