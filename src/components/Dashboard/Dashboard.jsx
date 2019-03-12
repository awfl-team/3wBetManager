import React from 'react';
import {
  Card, Container, Grid, Header, Icon,
} from 'semantic-ui-react';
import DashboardStats from '../Stats/DashboardStats';
import Top3 from './Top3';
import UserAmongSiblingsTable from './UserAmongSiblingsTable';
import AvailableBets from './AvailableBets';
import FinishedBets from './FinishedBets';

class Dashboard extends React.Component {
  render() {
    return (
      <div id="dashboard">
        <Header as="h1" icon textAlign="center">
          <Icon name="dashboard" circular />
          <Header.Content>Dashboard</Header.Content>
        </Header>
        <Container textAlign="center" fluid>
          <Grid>
            <Grid.Row columns={16}>
              <Grid.Column textAlign="center" computer={8} mobile={16}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>Finished bets</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <FinishedBets />
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column textAlign="center" computer={8} mobile={16}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>Available bets</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <AvailableBets />
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={16}>
              <Grid.Column textAlign="center" computer={16} mobile={16}>
                <Card fluid className="betters-table-card">
                  <Card.Content>
                    <Card.Header>Your position</Card.Header>
                  </Card.Content>
                  <Card.Content extra className="betters-table" id="userPositionAmongSiblings">
                    <UserAmongSiblingsTable />
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={16}>
              <Grid.Column textAlign="center" computer={8} mobile={16}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>Top 3</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Top3 />
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column textAlign="center" computer={8} mobile={16}>
                <Card fluid>
                  <Card.Content>
                    <Card.Header>Stats</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <DashboardStats />
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
