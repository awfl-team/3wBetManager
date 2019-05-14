import React from 'react';
import { Image, Input, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
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

  componentWillReceiveProps(nextProps) {
    let { match } = this.state;
    const { bet } = this.state;
    if (bet) {
      match = bet.Match;
    }
    if (nextProps.bets.find(betParam => betParam.Match.Id
        === match.Id && betParam.alreadyUpdated === true)) {
      this.setState({
        bet: nextProps.bets.find(betParam => betParam.Match.Id === match.Id),
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    let { match } = this.state;
    const { bet } = this.state;
    if (bet) {
      match = bet.Match;
    }
    return !!nextProps.bets.find(betParam => betParam.Match.Id === match.Id);
  }

  createBet(event, match, inputName) {
    if (event.target.value < 0) {
      event.target.value = '';
    } else {
      const data = { match, inputName, value: event.target.value };
      if (this.state.bet) {
        data.bet = this.state.bet;
        data.bet.alreadyUpdated = false;
      }
      this.props.addBet(data);
    }
  }

  render() {
    let { match } = this.state;
    const { bet } = this.state;
    if (bet) {
      match = bet.Match;
    }
    return (

      <div key={match.Id} className="betRow">
        <div className="betRow-info">
          <div className="container-hometeam">
            <div className="team-image">
              <Image
                src={match.HomeTeam.CrestUrl ? match.HomeTeam.CrestUrl : '/assets/images/hometeam-placeholder.png'}
                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/hometeam-placeholder.png'; }}
              />
            </div>
            <Label className="greenLabel">
              Win :
              {' '}
              {match.HomeTeamRating === 0 ? 'N/A' : parseFloat(match.HomeTeamRating).toFixed(2)}
            </Label>
            <div className="team-info">
              <div className="team-name">
                {match.HomeTeam.Name}
              </div>
            </div>
          </div>
          <div className="container-versus">
            <div className="match-info">
              {moment(match.UtcDate).format() >= moment.utc().format() ? (
                moment(match.UtcDate).format('MM-DD-YYYY')
              ) : (
                <Label className="infoLabel">
                  Underway
                </Label>
              )}
            </div>
            <div className="container-versus-details">
              <div className="home-score ">
                {moment(match.UtcDate).format() >= moment.utc().format() ? (
                  <Input defaultValue={bet ? bet.HomeTeamScore : ''} onChange={event => this.createBet(event, match, 'home')} fluid type="number" max="9" min="0" />
                ) : (
                  <p>
                    {bet.HomeTeamScore}
                  </p>
                )}
              </div>
              <div className="versus-text"> -</div>
              <div className="away-score loose">
                {moment(match.UtcDate).format() >= moment.utc().format() ? (
                  <Input defaultValue={bet ? bet.AwayTeamScore : ''} onChange={event => this.createBet(event, match, 'home')} fluid type="number" max="9" min="0" />
                ) : (
                  <p>
                    {bet.AwayTeamScore}
                  </p>
                )}
              </div>
            </div>
            <Label>
              Draw :
              {' '}
              {match.DrawRating === 0 ? 'N/A' : parseFloat(match.DrawRating).toFixed(2)}
            </Label>
          </div>
          <div className="container-awayteam">
            <div className="team-image">
              <Image
                src={match.AwayTeam.CrestUrl ? match.AwayTeam.CrestUrl : '/assets/images/awayteam-placeholder.png'}
                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/awayteam-placeholder.png'; }}
              />
            </div>
            <Label className="greenLabel">
              Win :
              {' '}
              {match.AwayTeamRating === 0 ? 'N/A' : parseFloat(match.AwayTeamRating).toFixed(2)}
            </Label>
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
