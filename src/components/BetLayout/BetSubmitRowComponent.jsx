import React from 'react';
import {
  Container, Image, Input,
} from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import BetService from '../../service/BetService';
import Bet from '../../model/Bet';
import { addTableBet } from '../../actions/TableBet';

function mapDispatchToProps(dispatch) {
  return {
    addBet: ({ bet }) => dispatch(addTableBet(bet)),
  };
}

class BetSubmitRowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.createBet = this.createBet.bind(this);
    this.state = {
      bets: [],
      matches: [],
      newBets: [],
    };
  }

  componentDidMount() {
    BetService.getCurrentBetAndMatches(this.props.competitionId).then((response) => {
      this.setState({ bets: response.data.Bets });
      this.setState({ matches: response.data.Matches });
    });
  }

  createBet(event, match, inputName) {
    const { newBets } = this.state;
    const findIndexBet = newBets.findIndex(bet => bet.Match.Id === match.Id);
    if (findIndexBet === -1) {
      const newBet = new Bet();
      if (inputName === 'home') newBet.HomeTeamScore = event.target.value;
      if (inputName === 'away') newBet.AwayTeamScore = event.target.value;
      newBet.Match = match;
      newBets.push(newBet);
    } else {
      if (inputName === 'home') newBets[findIndexBet].HomeTeamScore = event.target.value;
      if (inputName === 'away') newBets[findIndexBet].AwayTeamScore = event.target.value;
    }
    this.setState({ newBets });
    console.log(newBets);
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
                      <Input onChange={event => this.createBet(event, match, 'home')} fluid type="number" max="9" min="0" />
                    </div>
                    <div className="versus-text"> -</div>
                    <div className="away-score loose">
                      <Input onChange={event => this.createBet(event, match, 'away')} fluid type="number" max="9" min="0" />
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

const BetSubmitRow = connect(null, mapDispatchToProps)(BetSubmitRowComponent);
export default BetSubmitRow;
