import React from 'react';
import {
  Container,
} from 'semantic-ui-react';
import BetService from '../../service/BetService';
import BetSubmitRowComponent from './BetSubmitRowComponent';

class BetSubmitBlockComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bets: [],
      matches: [],
    };
  }

  componentDidMount() {
    BetService.getCurrentBetAndMatches(this.props.competitionId).then((response) => {
      this.setState({
        bets: response.data.Bets,
        matches: response.data.Matches,
      });
      this.setState({ });
    });
  }

  render() {
    const { bets, matches } = this.state;
    return (
      <div id="betRowsResults">
        <Container fluid>
          {bets.map(bet => (
            <BetSubmitRowComponent key={bet.Id} bet={bet} />
          ))}
          {matches.map(match => (
            <BetSubmitRowComponent key={match.Id} match={match} />
          ))}
        </Container>

      </div>
    );
  }
}

export default BetSubmitBlockComponent;
