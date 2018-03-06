import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Header } from 'semantic-ui-react';

const Status = ({ statusData }) => (
    <div>
        <Container text>
            <Header as="h2">Application Status</Header>
            <Card.Group itemsPerRow={3}>
                <Card>
                    <Card.Content>
                        <Card.Header>
                            Version
                        </Card.Header>
                        <Card.Meta>
                            Current version of deployed app
                        </Card.Meta>
                        <Card.Description>
                            VERSION X
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header>
                            Authentication
                        </Card.Header>
                        <Card.Meta>
                            JOE BLOGGS Is user logged in

                            expires in....
                        </Card.Meta>
                        <Card.Description>
                            isAuthenticated?
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header>
                            App Status
                        </Card.Header>
                        <Card.Meta>
                            ... something
                        </Card.Meta>
                        <Card.Description>
                            {statusData.applicationStatus}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
            <Card.Group itemsPerRow={3}>
                <Card>
                    <Card.Content>
                        <Card.Header>
                        Server
                        </Card.Header>
                        <Card.Meta>
                        Status
                        </Card.Meta>
                        <Card.Description>
                        Running
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header>
                        Client
                        </Card.Header>
                        <Card.Meta>
                        Status
                        </Card.Meta>
                        <Card.Description>
                        Running
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header>
                        Database
                        </Card.Header>
                        <Card.Meta>
                        Status
                        </Card.Meta>
                        <Card.Description>
                        Running
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        </Container>
    </div>
);

Status.propTypes = {
    statusData: PropTypes.shape({}).isRequired
};

export default Status;
