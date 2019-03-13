import React from 'react';
import {
  Container, Icon, Image, Label, Message,
} from 'semantic-ui-react';
import moment from 'moment';
import BetService from '../../service/BetService';

class BetRowResult extends React.Component {
  state = {
    bets: [],
  };

  componentDidMount() {
    BetService.getFinishBet(this.props.competitionId).then((response) => {
      this.setState({ bets: response.data });
    });
  }

  render() {
    const { bets } = this.state;
    return (
      <div id="betRows">
        <Container fluid>
          {bets.map(bet => (
            <div key={bet.Id} className="betRow">
              <div className="betRow-info">
                <div className="container-hometeam">
                  <div className="team-image">
                    <Image
                      src={bet.Match.HomeTeam.CrestUrl}
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
                  <div className="match-info">{moment(bet.Match.UtcDate).format('DD/MM/YYYY')}</div>
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
                      src={bet.Match.AwayTeam.CrestUrl}
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
                  <div className="bet-date">{moment(bet.Date).format('DD/MM/YYYY')}</div>
                  <div className="container-versus-details-results-bet">
                    <Label className={bet.Status === 'Perfect' ? 'greenLabel' : ''
                    || bet.Status === 'Wrong' ? 'redLabel' : '' || bet.Status === 'Ok' ? 'orangeLabel' : ''}
                    >
                      {bet.Status}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Container>
      </div>
    );
  }
}

export default BetRowResult;
