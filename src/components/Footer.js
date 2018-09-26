import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import logo from '../md-logo-green.png';

const Footer = () => (
    <Segment vertical className="footer-main">
        <Divider />
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
                            as={Link}
                            centered
                            size="mini"
                            alt="logo"
                            src={logo}
                            to="http://www.mineshdesigns.co.uk"
                            target="_blank"
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    </Segment>
);

export default Footer;
