import React from 'react';
import {
  Container, Divider, Header,
} from 'semantic-ui-react';
import BestBettersTable from './BestBettersTable';
import withAuth from '../AuthGuard/AuthGuard';

class BestBettersLayout extends React.Component {
  render() {
    return (
      <div id="bestBettersLayout">
        <Divider section />
        <Header as="h2" icon textAlign="center">
          <Header.Content>Top 50</Header.Content>
        </Header>
        <Container fluid>
          <BestBettersTable />
        </Container>
      </div>
    );
  }
}

export default withAuth(BestBettersLayout);
