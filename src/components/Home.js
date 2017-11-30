import React, { Component } from 'react';
import {
    Button,
    Container,
    Divider,
    Header,
    Segment
} from 'semantic-ui-react';

export default class HomepageLayout extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <Segment
                    inverted
                    textAlign="center"
                    style={{ minHeight: 700, padding: '1em 0em' }}
                    vertical
                >
                    <Container text>
                        <Header
                            as="h1"
                            content="Time to make plans..."
                            inverted
                            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
                        />
                        <Header
                            as="h2"
                            content="Stars can't shine without darkness."
                            inverted
                            style={{ fontSize: '1.7em', fontWeight: 'normal', color: '#eba3a3' }}
                        />
                        <Divider inverted section />
                        <Button
                            as="a"
                            color="green"
                            icon="list layout"
                            content="View lists"
                            href={'/list/all'}
                        />

                        <Button
                            as="a"
                            color="pink"
                            icon="edit"
                            content="Create lists"
                            href={'/list/update'}
                        />

                        <Button
                            as="a"
                            color="blue"
                            icon="cubes"
                            content="View Projects"
                            href={'/project/all'}
                        />

                    </Container>
                </Segment>
            </div>
        );
    }
}
