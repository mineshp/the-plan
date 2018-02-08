import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form, Grid, Header, Image, Input, Message, Segment } from 'semantic-ui-react';
import logo from '../../md-logo-green.png';

const Login = ({
    handleSubmit,
    handleChange,
    data
}) => (
    <Container>
        <Grid stackable centered>
            <Grid.Column className="login-form-grid-column">
                <Header as="h2" color="teal" textAlign="center">
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
                New user? <a href="/user/register">Register</a>
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
