import React from 'react';
import { Icon, Label, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import BetService from "../../service/BetService";
import moment from "moment";

class AvailableBets extends React.Component {
  state = {
    availableBets: [],
  };

  componentDidMount() {
    BetService.getCurrentBetLimited().then((response) => {
      this.setState({availableBets: response.data});
    });
  }

  render() {
    const { availableBets } = this.state;
    return (
      <List divided relaxed className="available-bets">
        {availableBets.length > 0 &&
          availableBets.map((availableBet, index) => (
            <List.Item key={index}>
              <List.Content>
                <List.Header>
                  <div className="hometeam"><span>{availableBet.Match.HomeTeam.Name}</span></div>
                  <div className="versus"><span> VS </span></div>
                  <div className="awayteam"><span>{availableBet.Match.AwayTeam.Name}</span></div>
                </List.Header>
                <List.Description><p>{availableBet.Match.Competition.Name} | {moment(availableBet.Match.UtcDate).format('MM-DD-YYYY')}</p></List.Description>
                <List.Description>
                  <Label>Bet : {availableBet.HomeTeamScore} - {availableBet.AwayTeamScore}</Label>
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        {availableBets.length > 0
        && <List.Item>
          <List.Content>
            <List.Header>
              <Link to={`/bet/submitBets`} className="button ui icon"> Submit bets <Icon name="arrow right" />
              </Link>
            </List.Header>
          </List.Content>
        </List.Item>
        }
        {availableBets.length === 0
        && <List.Item>
          <List.Content>
            <List.Header><h4>You have no available bets</h4></List.Header>
          </List.Content>
        </List.Item>
        }
      </List>
    );
  }
}

export default AvailableBets;
