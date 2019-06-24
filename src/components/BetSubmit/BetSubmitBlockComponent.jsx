import React from 'react';
import { Container } from 'semantic-ui-react';
import BetHttpService from '../../httpServices/BetHttpService';
import BetSubmitRowComponent from './BetSubmitRowComponent';
import SubmitBetsSkeleton from '../SkeletonLoaders/SubmitBetsSkeleton';

class BetSubmitBlockComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bets: [],
      matches: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    BetHttpService.getCurrentBetAndMatches(this.props.competitionId).then((response) => {
      this.setState({
        bets: response.data.Bets,
        matches: response.data.Matches,
        isLoading: false,
      });
    });
  }

  render() {
    const { bets, matches, isLoading } = this.state;
    return (
      <div id="betRowsResults">
        {isLoading ? (
          <SubmitBetsSkeleton />
        ) : (
          bets.length >= 0 && matches.length >= 0 && (
            <Container fluid>
              {bets.map(bet => (
                <BetSubmitRowComponent key={bet.Id} bet={bet} isLoading={isLoading} />
              ))}
              {matches.map(match => (
                <BetSubmitRowComponent key={match.Id} match={match} isLoading={isLoading} />
              ))}
            </Container>
          )
        )
        }
      </div>
    );
  }
}

export default BetSubmitBlockComponent;
