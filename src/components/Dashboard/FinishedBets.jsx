import React from 'react';
import { Icon, Label, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class FinishedBets extends React.Component {
  render() {
    {/* @todo get 4 most recent finished bets */}
    return (
      <List divided relaxed>
        <List.Item>
          <List.Content>
            <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
            <List.Description><p>RocketLeague | Match Date</p></List.Description>
            <List.Description>
              <Label color="blue">Result : 4 - 1</Label> | <Label>Bet : 4 - 1</Label> | <Label color="green"> Perfect </Label> | <Icon name="copyright" color="yellow" size="large" /> 500
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
            <List.Description><p>RocketLeague | Match Date</p></List.Description>
            <List.Description>
              <Label color="blue">Result : 4 - 1</Label> | <Label>Bet : 4 - 1</Label> | <Label color="green"> Perfect </Label> | <Icon name="copyright" color="yellow" size="large" /> 500
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
            <List.Description><p>RocketLeague | Match Date</p></List.Description>
            <List.Description>
              <Label color="blue">Result : 4 - 1</Label> | <Label>Bet : 4 - 1</Label> | <Label color="green"> Perfect </Label> | <Icon name="copyright" color="yellow" size="large" /> 500
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header><h4>HomeTeam VS AwayTeam</h4></List.Header>
            <List.Description><p>RocketLeague | Match Date</p></List.Description>
            <List.Description>
              <Label color="blue">Result : 4 - 1</Label> | <Label>Bet : 4 - 1</Label> | <Label color="green"> Perfect </Label> | <Icon name="copyright" color="yellow" size="large" /> 500
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>
              <Link to={`/bet/myBets`} className="button ui icon">
                See more <Icon name="arrow right" />
              </Link>
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
    );
  }
}

export default FinishedBets;
