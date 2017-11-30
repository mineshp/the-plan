import React from 'react';
import { Container, Segment, Grid, List, Header, Image } from 'semantic-ui-react';
import logo from '../md-logo-green.png';

const Footer = () => (
    <Segment
        inverted
        vertical
        style={{ margin: '2em 0em 0em', padding: '2em 0em' }}
    >
        <Container textAlign="center">
            <Grid divided inverted stackable>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <List link inverted className="footer-links">
                            <List.Item as="a">View all Lists</List.Item>
                            <List.Item as="a">View all Projects</List.Item>
                            <List.Item as="a">Create New List</List.Item>
                            <List.Item as="a">Create New Project</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Header className="footer-header" inverted as="h2" content="Designed by" />
                        <Image
                            centered
                            size="mini"
                            alt="logo"
                            src={logo}
                            href="http://www.mineshdesigns.co.uk"
                            target="_blank"
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    </Segment>
);

export default Footer;
