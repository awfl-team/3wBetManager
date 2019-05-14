import React from 'react';
import {
  Accordion, Container, Header, Icon, Label, Loader,
} from 'semantic-ui-react';
import CompetitionService from '../../service/CompetionService';
import BetRowResult from './BetRowResult';
import withAuth from '../AuthGuard/AuthGuard';
import BetService from '../../service/BetService';
import Competition from '../../model/Competition';

class BetLayoutResult extends React.Component {
  state = {
    activeIndex: 0,
    competitions: [],
    loading: true,
  };

  componentDidMount() {
    const competitionsWithNbBet: Competition[] = [];
    CompetitionService.getAllCompetitions().then((response) => {
      response.data.forEach((competition: Competition) => {
        BetService.getNbBetsInCompetitionForResult(competition.Id).then((res) => {
          if (res.data.NbBet !== undefined) {
            competition.NbBet = res.data.NbBet;
            competitionsWithNbBet.push(competition);
            this.setState({ competitions: competitionsWithNbBet });
          }
        });
      });
      this.setState({ loading: false });
    });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex, competitions, loading } = this.state;

    return (
      <div id="betCup">
        <Header as="h1" icon={true} textAlign="center">
          <Icon name="star" circular={true} />
          <Header.Content>Results</Header.Content>
        </Header>
        <Container fluid={true}>
          { competitions.length === 0 && !loading
          && <h2>No records</h2>
          }
          { competitions.length > 0 && !loading
            && (
            <Accordion fluid={true} styled={true}>
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
          }
          {loading === true
            && <Loader id="betLoader" size="huge" active={true} inline="centered" />
          }
        </Container>
      </div>
    );
  }
}

export default withAuth(BetLayoutResult);
