import React from 'react';
import {
  Container, Image, Input,
} from 'semantic-ui-react';
import moment from 'moment';
import BetService from '../../service/BetService';

class BetSubmitRow extends React.Component {
  state = {
    bets: [],
    matches: [],
  };

  componentDidMount() {
    BetService.getCurrentBetAndMatches(this.props.competitionId).then((response) => {
      this.setState({ bets: response.data.Bets });
      this.setState({ matches: response.data.Matches });
    });
  }

  render() {
    const { bets, matches } = this.state;
    return (
      <div id="betRowsResults">
        <Container fluid>
          {bets.length === 0 && matches.length === 0
              && (
              <div>
            No bets and matches
              </div>
              )
          }
          {bets.map(bet => (
            <div key={bet.Id} className="betRow">
              <div className="betRow-info">
                <div className="container-hometeam">
                  <div className="team-image">
                    <Image src={bet.Match.HomeTeam.CrestUrl} />
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
                    <div className="home-score ">
                      <Input defaultValue={bet.HomeTeamScore} fluid type="number" max="9" min="0" />
                    </div>
                    <div className="versus-text"> -</div>
                    <div className="away-score loose">
                      <Input defaultValue={bet.AwayTeamScore} fluid type="number" max="9" min="0" />
                    </div>
                  </div>
                </div>
                <div className="container-awayteam">
                  <div className="team-image">
                    <Image src={bet.Match.AwayTeam.CrestUrl} />
                  </div>
                  <div className="team-info">
                    <div className="team-name">{bet.Match.AwayTeam.Name}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {matches.map(match => (
            <div key={match.Id} className="betRow">
              <div className="betRow-info">
                <div className="container-hometeam">
                  <div className="team-image">
                    <Image src={match.HomeTeam.CrestUrl} />
                  </div>
                  <div className="team-info">
                    <div className="team-name">
                      {match.HomeTeam.Name}
                    </div>
                  </div>
                </div>
                <div className="container-versus">
                  <div className="match-info">{moment(match.UtcDate).format('DD/MM/YYYY')}</div>
                  <div className="container-versus-details">
                    <div className="home-score ">
                      <Input fluid type="number" max="9" min="0" />
                    </div>
                    <div className="versus-text"> -</div>
                    <div className="away-score loose">
                      <Input fluid type="number" max="9" min="0" />
                    </div>
                  </div>
                </div>
                <div className="container-awayteam">
                  <div className="team-image">
                    <Image src={match.AwayTeam.CrestUrl} />
                  </div>
                  <div className="team-info">
                    <div className="team-name">{match.AwayTeam.Name}</div>
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

export default BetSubmitRow;
