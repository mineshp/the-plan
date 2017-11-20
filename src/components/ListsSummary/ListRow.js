import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Icon, Label } from 'semantic-ui-react';

const projectLabels = (projects) => projects.map((project) => (
    <Label
        as="a"
        key={project.id}
        color="red"
    >
        <Icon name="empty star" />
        {project.name}
    </Label>
));

const List = ({ data, onDeleteHandler }) => {
    const listID = data._id; // eslint-disable-line no-underscore-dangle
    return (
        <Table.Row>
            <Table.Cell>{data.listName}</Table.Cell>
            <Table.Cell>{data.createdDate}</Table.Cell>
            <Table.Cell>{data.updatedDate}</Table.Cell>
            <Table.Cell>{projectLabels(data.projects)}</Table.Cell>
            <Table.Cell>
                <Button as="a" href={`/list/view/${listID}`}>View</Button>
                <Button
                    as="a"
                    content="Update"
                    icon="edit"
                    labelPosition="left"
                    color="teal"
                    href={`/list/update/${listID}`}
                />
                <Button
                    content="Delete"
                    icon="trash"
                    labelPosition="left"
                    color="blue"
                    value={listID}
                    onClick={onDeleteHandler}
                />
            </Table.Cell>
        </Table.Row>
    );
};

List.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        listName: PropTypes.string.isRequired
    }).isRequired,
    onDeleteHandler: PropTypes.func.isRequired
};

export default List;