import React from 'react';
import {
  Icon, Image, Label, List,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import BetHttpService from '../../httpServices/BetHttpService';

class AvailableBets extends React.Component {
  state = {
    availableBets: [],
  };

  componentDidMount() {
    BetHttpService.getCurrentBetLimited().then((response) => {
      this.setState({ availableBets: response.data });
    });
  }

  render() {
    const { availableBets } = this.state;
    return (
      <List divided relaxed className="available-bets">
        {availableBets.length > 0
          && availableBets.map(availableBet => (
            <List.Item key={availableBet.Id}>
              <List.Content>
                <List.Header>
                  <div className="hometeam">
                    <span>{availableBet.Match.HomeTeam.Name}</span>
                    <div className="team-image">
                      <Image
                        src={availableBet.Match.HomeTeam.CrestUrl ? availableBet.Match.HomeTeam.CrestUrl : '/assets/images/hometeam-placeholder.png'}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/hometeam-placeholder.png'; }}
                      />
                    </div>
                  </div>
                  <div className="versus"><span> VS </span></div>
                  <div className="awayteam">
                    <div className="team-image">
                      <Image
                        src={availableBet.Match.AwayTeam.CrestUrl ? availableBet.Match.AwayTeam.CrestUrl : '/assets/images/awayteam-placeholder.png'}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/awayteam-placeholder.png'; }}
                      />
                    </div>
                    <span>{availableBet.Match.AwayTeam.Name}</span>
                  </div>
                </List.Header>
                <List.Description>
                  <p>
                    {availableBet.Match.Competition.Name}
                    <span> | </span>
                    {moment(availableBet.Match.UtcDate).format('MM-DD-YYYY')}
                  </p>
                </List.Description>
                <List.Description>
                  <div className="whiteColor tags">
                    <Label>
                      Bet :
                      {availableBet.HomeTeamScore}
                      -
                      {availableBet.AwayTeamScore}
                    </Label>
                    {' '}
                    {availableBet.Multiply !== 0
                    && (
                      <div>
                        <span> | </span>
                        <Label className={availableBet.Multiply === 10 ? 'legendaryLabel' : ''
                        || availableBet.Multiply === 5 ? 'epicLabel' : ''
                        || availableBet.Multiply === 2 ? 'rareLabel' : ''}
                        >
                          x
                          {' '}
                          {availableBet.Multiply}
                        </Label>
                      </div>
                    )
                    }
                  </div>
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        {availableBets.length > 0
        && (
        <List.Item>
          <List.Content>
            <List.Header>
              <Link to="/bet/submitBets" className="button ui icon">
                Submit bets
                <Icon name="arrow right" />
              </Link>
            </List.Header>
          </List.Content>
        </List.Item>
        )
        }
        {availableBets.length === 0
        && (
        <List.Item>
          <List.Content>
            <List.Header><h4>You have no available bets</h4></List.Header>
          </List.Content>
        </List.Item>
        )
        }
      </List>
    );
  }
}

export default AvailableBets;
