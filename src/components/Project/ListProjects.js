import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'semantic-ui-react';
import DisplayMessage from '../Shared/DisplayMessage';

const ListProjects = ({
        result,
        cards,
        onDeleteHandler
    }) => {
        return(
            <Container>
                {
                    (result.error || result.success) &&
                    <DisplayMessage status={result} />
                }
                <div className="List main">
                    <Card.Group itemsPerRow={3}>
                        { cards }
                    </Card.Group>
                </div>
            </Container>
        );
    };

ListProjects.propTypes = {
    result: PropTypes.shape({
    }),
    cards: PropTypes.array.isRequired,
    onDeleteHandler: PropTypes.func.isRequired
};

export default ListProjects;
