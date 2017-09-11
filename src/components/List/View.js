import React from 'react'
import ViewList from '../../HOC/List/View.js'
import { Container } from 'semantic-ui-react';

const View = (props) => (
  <Container>
    <ViewList listID={props.match.params.id} />
  </Container>
);

export default View;