import React, { Component } from 'react';
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Segment
} from 'semantic-ui-react';

export default class HomepageLayout extends Component {
    constructor() {
        super();
        this.state = {};
    }

    // eslint-disable-next-line class-methods-use-this
    render() {
        return (
            <div className="content-body">
                <Segment
                    textAlign="center"
                    className="home-segment"
                    vertical
                >
                    <Container text>
                        <Header
                            as="h2"
                            content="Time to make plans..."
                            className="home-mainheader"
                        />
                        <Header
                            as="h3"
                            content="Stars can't shine without darkness."
                            className="home-header"
                        />
                        <Divider inverted section />
                        <Grid stackable divided="vertically" centered>
                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <Button
                                        as="a"
                                        color="green"
                                        icon="list layout"
                                        content="View lists"
                                        href={'/list/all'}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Button
                                        as="a"
                                        color="pink"
                                        icon="edit"
                                        content="Create lists"
                                        href={'/list/update'}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Button
                                        as="a"
                                        color="blue"
                                        icon="cubes"
                                        content="View Projects"
                                        href={'/project/all'}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <div />
                    </Container>
                </Segment>
            </div>
        );
    }
}
