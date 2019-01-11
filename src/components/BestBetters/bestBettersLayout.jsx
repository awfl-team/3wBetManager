import React from 'react';
import {Container, Divider, Header, Icon} from 'semantic-ui-react';
import BestBettersTable from './BestBettersTable';
import BestBettersCurrentUserTable from './BestBettersCurrentUserTable';

class BestBettersLayout extends React.Component {

  render() {
    return (
        <div id="bestBettersLayout">
          <Header as="h2" icon textAlign="center">
            <Header.Content>My position</Header.Content>
          </Header>
          <Container fluid>
            <BestBettersCurrentUserTable />
          </Container>
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

export default BestBettersLayout;
