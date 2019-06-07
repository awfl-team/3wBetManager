import React from 'react';
import {
  Accordion, Container, Header, Icon, Label, Loader,
} from 'semantic-ui-react';
import CompetitionService from '../../httpServices/CompetionHttpService';
import BetRowResult from './BetRowResult';
import withAuth from '../AuthGuard/AuthGuard';
import BetHttpService from '../../httpServices/BetHttpService';
import NoBets from '../NoBets/NoBets';

class BetLayoutResult extends React.Component {
  state = {
    activeIndex: 0,
    competitions: [],
    isLoading: true,
  };

  componentDidMount() {
    const competitionsWithNbBet = [];
    CompetitionService.getAllCompetitions().then((response) => {
      response.data.forEach((competition) => {
        BetHttpService.getNbBetsInCompetitionForResult(competition.Id).then((res) => {
          if (res.data.NbBet !== undefined) {
            competition.NbBet = res.data.NbBet;
            competitionsWithNbBet.push(competition);
            this.setState({
              competitions: competitionsWithNbBet,
            });
          }
          this.setState({ isLoading: false });
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
    const { activeIndex, competitions, isLoading } = this.state;

    return (
      <div id="betCup">
        <Header as="h1" icon textAlign="center">
          <Icon name="star" circular />
          <Header.Content>Results</Header.Content>
        </Header>
        <Container fluid>
          {isLoading ? (
            <Loader id="betLoader" size="huge" active inline="centered" />
          ) : (
            competitions.length <= 0 ? (
              <NoBets />
            ) : (
              <Accordion fluid styled>
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
            )
          )
          }
        </Container>
      </div>
    );
  }
}

export default withAuth(BetLayoutResult);
