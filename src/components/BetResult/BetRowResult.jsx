import React from 'react';
import {
  Container, Icon, Image, Label, Message,
} from 'semantic-ui-react';
import moment from 'moment';
import BetHttpService from '../../httpServices/BetHttpService';
import Bet from '../../model/Bet';
import ResultsBetsSkeleton from '../SkeletonLoaders/ResultsBetsSkeleton';

class BetRowResult extends React.Component {
  state = {
    bets: [],
    isLoading: true,
  };

  componentDidMount() {
    BetHttpService.getFinishBet(this.props.competitionId).then((response) => {
      this.setState({
        bets: response.data,
        isLoading: false,
      });
    });
  }

  render() {
    const { bets, isLoading } = this.state;
    return (
      <div id="betRows">
        { isLoading ? (
          <ResultsBetsSkeleton />
        ) : (
          <Container fluid>
            {bets.map(bet => (
              <div
                key={bet.Id}
                className={`betRow ${bet.Multiply === 10 ? 'buffed-x10' : ''
                || bet.Multiply === 5 ? 'buffed-x5' : ''
                || bet.Multiply === 2 ? 'buffed-x2' : ''}`}
              >
                <div className="betRow-info">
                  <div className="container-hometeam">
                    <div className="team-image">
                      <Image
                        src={bet.Match.HomeTeam.CrestUrl ? bet.Match.HomeTeam.CrestUrl : '/assets/images/hometeam-placeholder.png'}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/hometeam-placeholder.png'; }}
                        className={bet.Match.Score.Winner === 'HOME_TEAM' ? 'win' : 'loose'}
                      />
                    </div>
                    <div className="team-info">
                      <div className="team-name">
                        {bet.Match.HomeTeam.Name}
                      </div>
                    </div>
                  </div>
                  <div className="container-versus">
                    <div className="match-info">{moment(bet.Match.UtcDate).format('MM-DD-YYYY')}</div>
                    <div className="container-versus-details">
                      <div className="home-score ">{bet.Match.Score.FullTime.HomeTeam}</div>
                      <div className="versus-text"> -</div>
                      <div className="away-score loose">{bet.Match.Score.FullTime.AwayTeam}</div>
                    </div>
                    <div className="container-versus-details-results">
                      <div className="home-score">{bet.HomeTeamScore}</div>
                      <div className="versus-text"> -</div>
                      <div className="away-score">{bet.AwayTeamScore}</div>
                    </div>
                  </div>
                  <div className="container-awayteam">
                    <div className="team-image">
                      <Image
                        src={bet.Match.AwayTeam.CrestUrl ? bet.Match.AwayTeam.CrestUrl : '/assets/images/awayteam-placeholder.png'}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/awayteam-placeholder.png'; }}
                        className={bet.Match.Score.Winner === 'Away_TEAM' ? 'win' : 'loose'}
                      />
                    </div>
                    <div className="team-info">
                      <div className="team-name">
                        {bet.Match.AwayTeam.Name}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="betRow-results">
                  <Message.Header>
                    {bet.PointsWon}
                    {' '}
                    <Icon color="yellow" name="copyright" />
                  </Message.Header>
                  <div className="container-versus-details">
                    <div className="bet-date">{moment(bet.Date).format('MM-DD-YYYY')}</div>
                    <div className="container-versus-details-results-bet">
                      <Label className={
                        bet.Status === Bet.STATUS_PERFECT ? 'greenLabel' : ''
                        || bet.Status === Bet.STATUS_WRONG ? 'redLabel' : ''
                        || bet.Status === Bet.STATUS_OK ? 'orangeLabel' : ''}
                      >
                        {bet.Status}
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Container>
        )}

      </div>
    );
  }
}

export default BetRowResult;
