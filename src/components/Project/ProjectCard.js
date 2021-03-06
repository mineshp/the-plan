import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { formatDate } from '../../helpers/validators/common';

const ProjectCard = ({ data, onDeleteHandler }) => (
    <Card color={data.colour}>
        <Card.Content>
            <Card.Header className="firstletter-capitalise">
                {data.projectName}
                <Button
                    as={Link}
                    floated="right"
                    icon="list layout"
                    color="blue"
                    to={`/project/${data.projectName}/lists`} // eslint-disable-line no-underscore-dangle
                    title={`View all lists for project ${data.projectName}`}
                />
            </Card.Header>
        </Card.Content>
        <Card.Content>
            <Card.Meta>
                Created by: {data.owner}
            </Card.Meta>
            <Card.Meta>
                {formatDate(data.createdDate)}
            </Card.Meta>
            <Card.Description>
                {data.projectDescription}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className="buttons">
                <Button
                    as={Link}
                    content="Update"
                    icon="edit"
                    labelPosition="left"
                    color="green"
                    to={`/project/update/${data._id}`} // eslint-disable-line no-underscore-dangle
                />
                <Button
                    content="Delete"
                    icon="trash"
                    labelPosition="left"
                    color="pink"
                    value={data._id} // eslint-disable-line no-underscore-dangle
                    onClick={onDeleteHandler}
                />
            </div>
        </Card.Content>
    </Card>
);

ProjectCard.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        projectName: PropTypes.string.isRequired,
        colour: PropTypes.string
    }).isRequired,
    onDeleteHandler: PropTypes.func.isRequired

};

export default ProjectCard;
