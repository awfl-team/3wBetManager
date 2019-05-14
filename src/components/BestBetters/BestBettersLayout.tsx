import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import BestBettersTable from './BestBettersTable';
import withAuth from '../AuthGuard/AuthGuard';

class BestBettersLayout extends React.Component {
  render() {
    return (
      <div id="bestBettersLayout">
        <Header as="h1" icon={true} textAlign="center">
          <Icon name="fire" circular={true} />
          <Header.Content>Top 50</Header.Content>
        </Header>
        <Container fluid={true}>
          <BestBettersTable />
        </Container>
      </div>
    );
  }
}

export default withAuth(BestBettersLayout);
