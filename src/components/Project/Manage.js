import React from 'react';
import ManageProject from '../../HOC/Project/ManageProject.js';
import LeftHandMenu from '../Shared/LeftHandMenu.js';
import { Container, Grid } from 'semantic-ui-react';

const Manage = () => (
  <Container>
    <Grid>
      <Grid.Column width={4}>
        <LeftHandMenu />
      </Grid.Column>
      <Grid.Column width={12}>
        <ManageProject />
      </Grid.Column>
    </Grid>
  </Container>
)

export default Manage;