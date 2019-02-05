import React from 'react';
import {
  Container, Image, Input,
} from 'semantic-ui-react';
import moment from 'moment';
import { connect } from 'react-redux';
import BetService from '../../service/BetService';
import { addTableBet } from '../../actions/TableBetActions';

const mapStateToProps = state => ({ bets: state.bets });

function mapDispatchToProps(dispatch) {
  return {
    addBet: ({
      match, inputName, value, bet,
    }) => dispatch(addTableBet(match, inputName, value, bet)),
  };
}

class BetSubmitRowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.createBet = this.createBet.bind(this);
    const { bet, match } = this.props;
    this.state = {
      bet,
      match,
    };
  }

  createBet(event, match, inputName) {
    const data = { match, inputName, value: event.target.value };
    if (this.state.bet) {
      data.bet = this.state.bet;
    }
    this.props.addBet(data);
  }

  render() {
    let { bet, match } = this.state;

    if (bet) {
      match = bet.Match;
    }
    return (

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
                <Input defaultValue={bet ? bet.HomeTeamScore : ''} onChange={event => this.createBet(event, match, 'home')} fluid type="number" max="9" min="0" />
              </div>
              <div className="versus-text"> -</div>
              <div className="away-score loose">
                <Input defaultValue={bet ? bet.AwayTeamScore : ''} onChange={event => this.createBet(event, match, 'away')} fluid type="number" max="9" min="0" />
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
    );
  }
}

const BetSubmitRow = connect(mapStateToProps, mapDispatchToProps)(BetSubmitRowComponent);
export default BetSubmitRow;
