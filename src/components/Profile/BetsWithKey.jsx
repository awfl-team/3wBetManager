import React from 'react';
import {
  Grid,
  Icon, Image, Label, List, Card,
} from 'semantic-ui-react';
import moment from 'moment';
import BetService from '../../service/BetService';
import Bet from '../../model/Bet';
import LimitedBetsSkeleton from '../SkeletonLoaders/LimitedBetsSkeleton';

class BetsWithKey extends React.Component {
  state = {
    availableBets: [],
    finishedBets: [],
    isAvailableBetsLoading: true,
    isFinishedBetsLoading: true,
  };

  componentDidMount() {
    BetService.getCurrentBetLimitedWithKey(this.props.userId).then((response) => {
      this.setState({
        availableBets: response.data,
        isAvailableBetsLoading: false,
      });
    });
    BetService.getFinishBetLimitedWithKey(this.props.userId).then((response) => {
      this.setState({
        finishedBets: response.data,
        isFinishedBetsLoading: false,
      });
    });
  }

  render() {
    const {
      availableBets, finishedBets,
      isAvailableBetsLoading, isFinishedBetsLoading,
    } = this.state;
    return (
      <Grid>
        <Grid.Row columns={16}>
          <Grid.Column textAlign="center" computer={8} mobile={16}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Finished bets</Card.Header>
              </Card.Content>
              <Card.Content extra>
                { isFinishedBetsLoading ? (
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
                    {finishedBets.length === 0
                    && (
                      <List.Item>
                        <List.Content>
                          <List.Header><h4>No records</h4></List.Header>
                        </List.Content>
                      </List.Item>
                    )
                    }
                  </List>
                )
                }
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column textAlign="center" computer={8} mobile={16}>
            <Card fluid>
              <Card.Content>
                <Card.Header>Incomming bets submitted</Card.Header>
              </Card.Content>
              <Card.Content extra>
                { isAvailableBetsLoading ? (
                  <LimitedBetsSkeleton />
                ) : (
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
                    {availableBets.length === 0
                    && (
                      <List.Item>
                        <List.Content>
                          <List.Header><h4>No records</h4></List.Header>
                        </List.Content>
                      </List.Item>
                    )
                    }
                  </List>
                )
                }
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BetsWithKey;
