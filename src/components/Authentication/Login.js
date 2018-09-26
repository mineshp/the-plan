import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import logo from '../../md-logo-green.png';

const Login = ({
    handleSubmit,
    handleChange,
    data
}) => (
    <Container className="content-body">
        <Grid stackable centered>
            <Grid.Column className="login-form-grid-column">
                <Header as="h2" className="login-header" textAlign="center">
                    <Image src={logo} className="home-logo" />
                    {' '}Login to morpheus
                </Header>
                <Form size="large" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Field>
                            <Input
                                fluid
                                name="username"
                                autoComplete="username"
                                placeholder="Username..."
                                icon="user"
                                iconPosition="left"
                                className="text-box-3-col"
                                defaultValue={data.username}
                                onChange={handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                name="password"
                                type="password"
                                autoComplete="password"
                                placeholder="Password..."
                                className="text-box-3-col"
                                onChange={handleChange}
                                defaultValue={data.password}
                            />
                        </Form.Field>
                        <Button color="pink" fluid size="large" type="submit">Login</Button>
                    </Segment>
                </Form>
                <Message>
                New user? <Link to="/user/register">Register</Link>
                </Message>
            </Grid.Column>
        </Grid>
    </Container>
);

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    data: PropTypes.shape({}).isRequired
};

export default Login;
