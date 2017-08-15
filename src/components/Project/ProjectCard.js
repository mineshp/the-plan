import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';


const ProjectCard = ({ data }) => (
    <Card
        raised
        color={data.colour}
        href={`#project/${data._id}/view`}
        header={data.projectName}
        meta={data.createdDate}
    />
);

ProjectCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
    colour: PropTypes.string
    }).isRequired
}

export default ProjectCard;
