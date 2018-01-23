import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const NotFound = () => (
    <div>
        <Container text>
            <Header as="h2">404 Page Not Found!</Header>
            <p>Oops it looks like you have ventured off-course.</p>
        </Container>
    </div>
);

export default NotFound;
