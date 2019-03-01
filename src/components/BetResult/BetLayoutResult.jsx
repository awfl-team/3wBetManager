import React from 'react';
import {
  Accordion, Container, Header, Icon, Label,
} from 'semantic-ui-react';
import CompetitionService from '../../service/CompetionService';
import BetRowResult from './BetRowResult';
import withAuth from '../AuthGuard/AuthGuard';
import BetService from '../../service/BetService';

// TODO Add Loader
class BetLayoutResult extends React.Component {
  state = {
    activeIndex: 0,
    competitions: [],
  };

  componentDidMount() {
    const competitionsWithNbBet = [];
    CompetitionService.getAllCompetions().then((response) => {
      response.data.forEach((competition) => {
        BetService.getNbBetsInCompetitionForResult(competition.Id).then((res) => {
          if (res.data.NbBet !== undefined) {
            competition.NbBet = res.data.NbBets;
            competitionsWithNbBet.push(competition);
            this.setState({ competitions: competitionsWithNbBet });
          }
        });
      });
    });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex, competitions } = this.state;

    return (
      <div id="betCup">
        <Header as="h1" icon textAlign="center">
          <Icon name="star" circular />
          <Header.Content>Results</Header.Content>
        </Header>
        <Container fluid>
          { competitions.length === 0
          && <h2>No records</h2>
          }
          { competitions.length > 0
            && <Accordion fluid styled>
              {competitions.map((competition, index) => (
                <div key={competition.Id}>
                  <Accordion.Title
                    active={activeIndex === index}
                    index={index}
                    onClick={this.handleClick}
                    className="competition-accordion"
                  >
                    <Icon name="dropdown" />
                    {competition.Name}
                    <Label attached="top right">
                      <Icon name="ticket" />
                      {competition.NbBet}
                    </Label>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === index}>
                    <BetRowResult competitionId={competition.Id} />
                  </Accordion.Content>
                </div>
              ))}
            </Accordion>
          }
        </Container>
      </div>
    );
  }
}

export default withAuth(BetLayoutResult);
