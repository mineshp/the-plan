import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'semantic-ui-react/dist/commonjs/modules/Accordion';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import ListHeadings from './ListHeadings';
import ListItems from './ListItems';
import ListFooter from './ListFooter';
import ListDetails from './ListDetails';
import ListUploadFile from './ListUploadFile';

const List = ({
    handleAddItem, handleChange, handleDelete,
    handleSubmit, handleCompleted, items, list, activeIndex,
    handleListAccordionClick
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

                <Accordion fluid styled>
                    <Accordion.Title active={activeIndex === 0} id="0" onClick={handleListAccordionClick}>
                        <Icon name="dropdown" />
                            View Images for List
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        AAA
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 1} id="1" onClick={handleListAccordionClick}>
                        <Icon name="dropdown" />
                            Upload Image
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <ListUploadFile />
                    </Accordion.Content>
                </Accordion>
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
    handleCompleted: PropTypes.func.isRequired,
    handleListAccordionClick: PropTypes.func.isRequired,
    activeIndex: PropTypes.number.isRequired
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
