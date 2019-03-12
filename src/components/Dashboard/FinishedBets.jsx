import React from 'react';
import {
  Icon, Image, Label, List,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import BetService from '../../service/BetService';

class FinishedBets extends React.Component {
  state = {
    finishedBets: [],
  };

  componentDidMount() {
    BetService.getFinishBetLimited().then((response) => {
      this.setState({ finishedBets: response.data });
    });
  }

  render() {
    const { finishedBets } = this.state;
    return (
      <List divided relaxed className="finished-bets">
        {finishedBets.length > 0
          && finishedBets.map(finishedBet => (
            <List.Item key={finishedBet.Id}>
              <List.Content>
                <List.Header>
                  <div className="hometeam">
                    <div className="team-image">
                      <Image src={finishedBet.Match.HomeTeam.CrestUrl} />
                    </div>
                    <span>{finishedBet.Match.HomeTeam.Name}</span>
                  </div>
                  <div className="versus"><span> VS </span></div>
                  <div className="awayteam">
                    <div className="team-image">
                      <Image src={finishedBet.Match.AwayTeam.CrestUrl} />
                    </div>
                    <span>{finishedBet.Match.AwayTeam.Name}</span>
                  </div>
                </List.Header>
                <List.Description>
                  <p>
                    {finishedBet.Match.Competition.Name}
                    |
                    {moment(finishedBet.Match.UtcDate).format('MM-DD-YYYY')}
                  </p>
                </List.Description>
                <List.Description>
                  <div className="whiteColor">
                    <Label className="infoLabel">
                      Result :
                      {finishedBet.Match.Score.FullTime.HomeTeam}
                      -
                      {finishedBet.Match.Score.FullTime.AwayTeam}
                    </Label>
                    {' '}
                    |
                    {' '}
                    <Label>
                      Bet :
                      {finishedBet.HomeTeamScore}
                      -
                      {finishedBet.AwayTeamScore}
                    </Label>
                    {' '}
                    |
                    {' '}
                    <Label color="green">{finishedBet.Status}</Label>
                    {' '}
                    |
                    {' '}
                    {finishedBet.PointsWon}
                    <Icon name="copyright" color="yellow" size="large" />
                  </div>
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        {finishedBets.length > 0
          && (
          <List.Item>
            <List.Content>
              <List.Header>
                <Link to="/bet/mybets" className="button ui icon">
                  My results
                  <Icon name="arrow right" />
                </Link>
              </List.Header>
            </List.Content>
          </List.Item>
          )
        }
        {finishedBets.length === 0
        && (
        <List.Item>
          <List.Content>
            <List.Header><h4>You have no finished bets</h4></List.Header>
          </List.Content>
        </List.Item>
        )
        }
      </List>
    );
  }
}

export default FinishedBets;
