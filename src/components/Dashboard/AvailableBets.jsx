import React from 'react';
import { Icon, Label, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class AvailableBets extends React.Component {
  render() {
    {/* @todo get 4 most recent unfinished bets */}
    return (
      <List divided relaxed>
        <List.Item>
          <List.Content>
            <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
            <List.Description><p>RocketLeague | Match Date</p></List.Description>
            <List.Description>
              <Label>Bet : 4 - 1</Label>
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
            <List.Description><p>RocketLeague | Match Date</p></List.Description>
            <List.Description>
              <Label>Bet : 4 - 1</Label>
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
            <List.Description><p>RocketLeague  | Match Date </p></List.Description>
            <List.Description>
              <Label>Bet : 4 - 1</Label>
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
            <List.Description><p>RocketLeague | Match Date</p></List.Description>
            <List.Description>
              <Label>Bet : 4 - 1</Label>
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>
              <Link to={`/bet/submitBets`} className="button ui icon">
                See more <Icon name="arrow right" />
              </Link>
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
    );
  }
}

export default AvailableBets;
