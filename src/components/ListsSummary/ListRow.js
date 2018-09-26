import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import { formatDate } from '../../helpers/validators/common';

const projectLabels = (projects) => projects.slice(0, 3).map((project) => (
    <Label
        as="a"
        key={project.id}
        color="pink"
        href={`/project/${project.name}/lists`}
    > {project.name}
    </Label>
));

const List = ({ data, onDeleteHandler, handleCompleted, onBtnClickHandler }) => {
    const listID = data._id; // eslint-disable-line no-underscore-dangle
    const rowProps = {};
    rowProps.negative = data.completed;

    const markListAsCompleteBtn = (
        <Button
            icon="unlock"
            color="violet"
            id={listID}
            onClick={handleCompleted}
            className="button-divider"
            title="List is Active"
        />
    );

    const markListAsUnCompleteBtn = (
        <Button
            icon="lock"
            color="teal"
            id={listID}
            onClick={handleCompleted}
            className="button-divider"
            title="List has been Completed"
        />
    );

    const completedBtn = data.completed ? markListAsUnCompleteBtn : markListAsCompleteBtn;

    return (
        <Table.Row {...rowProps}>
            <Table.Cell>{data.listName}</Table.Cell>
            <Table.Cell>{formatDate(data.createdDate)}</Table.Cell>
            <Table.Cell>{formatDate(data.updatedDate)}</Table.Cell>
            <Table.Cell>{projectLabels(data.projects)}</Table.Cell>
            <Table.Cell colSpan="2">
                {completedBtn}
                <Button
                    as={Link}
                    color="blue"
                    icon="list layout"
                    to={`/list/view/${listID}`}
                    title="View/Update List"
                />
                <Button
                    onClick={onBtnClickHandler}
                    value={`/list/update/${listID}`}
                    icon="edit"
                    color="green"
                    title="Amend List Setup"
                />
                <Button
                    icon="trash"
                    color="pink"
                    value={listID}
                    onClick={onDeleteHandler}
                    title="Delete List"
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
    onDeleteHandler: PropTypes.func.isRequired,
    onBtnClickHandler: PropTypes.func.isRequired,
    handleCompleted: PropTypes.func.isRequired
};

export default List;
