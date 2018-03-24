import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Table } from 'semantic-ui-react';

const ListItems = ({ downloadPDF, headings, listId }) => {
    const columnHeadings = [];
    headings.map((heading) => (
        columnHeadings.push(<Table.HeaderCell key={heading.id}>{heading.name}</Table.HeaderCell>)
    ));

    columnHeadings.push(
        <Table.HeaderCell key={'actions'} textAlign="right" colSpan="2">
            <Button
                as="a"
                icon="edit"
                color="green"
                href={`/list/update/${listId}`}
                title="Amend List Setup"
            />
            <Dropdown text="Export PDF" icon="file pdf outline" floating labeled button className="icon pdf">
                <Dropdown.Menu>
                    <Dropdown.Item id={listId} onClick={downloadPDF}>Save</Dropdown.Item>
                    <Dropdown.Item disabled>Email</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Table.HeaderCell>
    );

    return (
        <Table.Header>
            <Table.Row key={123}>
                {columnHeadings}
            </Table.Row>
        </Table.Header>
    );
};

ListItems.propTypes = {
    headings: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            position: PropTypes.number
        })
    ).isRequired,
    downloadPDF: PropTypes.func.isRequired,
    listId: PropTypes.string.isRequired
};

ListItems.defaultProps = {
    headings: []
};

export default ListItems;
