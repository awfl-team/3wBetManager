import React from 'react';
import {
  Icon, Image, Label, List,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import BetService from '../../service/BetService';
import Bet from '../../model/Bet';
import LimitedBetsSkeleton from '../SkeletonLoaders/LimitedBetsSkeleton';

class FinishedBets extends React.Component {
  state = {
    finishedBets: [],
    isLoading: true,
  };

  componentDidMount() {
    BetService.getFinishBetLimited().then((response) => {
      this.setState({
        finishedBets: response.data,
        isLoading: false,
      });
    });
  }

  render() {
    const { finishedBets, isLoading } = this.state;
    return (
      <div>
        { isLoading ? (
          <LimitedBetsSkeleton />
        ) : (
          <List divided relaxed className="finished-bets">
            {finishedBets.length > 0
            && finishedBets.map(finishedBet => (
              <List.Item key={finishedBet.Id}>
                <List.Content>
                  <List.Header>
                    <div className="hometeam">
                      <span>{finishedBet.Match.HomeTeam.Name}</span>
                      <div className="team-image">
                        <Image
                          src={finishedBet.Match.HomeTeam.CrestUrl ? finishedBet.Match.HomeTeam.CrestUrl : '/assets/images/hometeam-placeholder.png'}
                          onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/hometeam-placeholder.png'; }}
                        />
                      </div>
                    </div>
                    <div className="versus"><span> VS </span></div>
                    <div className="awayteam">
                      <div className="team-image">
                        <Image
                          src={finishedBet.Match.AwayTeam.CrestUrl ? finishedBet.Match.AwayTeam.CrestUrl : '/assets/images/awayteam-placeholder.png'}
                          onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/awayteam-placeholder.png'; }}
                        />
                      </div>
                      <span>{finishedBet.Match.AwayTeam.Name}</span>
                    </div>
                  </List.Header>
                  <List.Description>
                    <p>
                      {finishedBet.Match.Competition.Name}
                      <span> | </span>
                      {moment(finishedBet.Match.UtcDate).format('MM-DD-YYYY')}
                    </p>
                  </List.Description>
                  <List.Description>
                    <div className="whiteColor tags">
                      <Label className="infoLabel">
                        Result :
                        {finishedBet.Match.Score.FullTime.HomeTeam}
                        -
                        {finishedBet.Match.Score.FullTime.AwayTeam}
                      </Label>
                      <span> | </span>
                      <Label>
                        Bet :
                        {finishedBet.HomeTeamScore}
                        -
                        {finishedBet.AwayTeamScore}
                      </Label>
                      <span> | </span>
                      <Label
                        className={
                          finishedBet.Status === Bet.STATUS_PERFECT ? 'greenLabel' : ''
                          || finishedBet.Status === Bet.STATUS_WRONG ? 'redLabel' : ''
                          || finishedBet.Status === Bet.STATUS_OK ? 'orangeLabel' : ''}
                      >
                        {finishedBet.Status}
                      </Label>
                      {finishedBet.Multiply !== 0
                      && (
                        <div>
                          <span> | </span>
                          <Label className={finishedBet.Multiply === 10 ? 'legendaryLabel' : ''
                          || finishedBet.Multiply === 5 ? 'epicLabel' : ''
                          || finishedBet.Multiply === 2 ? 'rareLabel' : ''}
                          >
                            x
                            {' '}
                            {finishedBet.Multiply}
                          </Label>
                        </div>
                      )
                      }
                      <span> | </span>
                      <div>
                        {finishedBet.PointsWon}
                        {' '}
                        <Icon name="copyright" color="yellow" size="large" />
                      </div>
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
        )
        }
      </div>
    );
  }
}

export default FinishedBets;
