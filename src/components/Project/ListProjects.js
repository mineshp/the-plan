import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'semantic-ui-react';

const ListProjects = ({ cards }) => (
    <Container>
        <div className="List main content-body">
            <Card.Group itemsPerRow={3}>
                {cards}
            </Card.Group>
        </div>
    </Container>
);

ListProjects.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({})
    )
};

ListProjects.defaultProps = {
    cards: []
};

export default ListProjects;
