import React from 'react';
import {
  Accordion, Container, Header, Icon, Label, Loader,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import CompetitionService from '../../httpServices/CompetionHttpService';
import BetHttpService from '../../httpServices/BetHttpService';
import BetSubmitBlockComponent from './BetSubmitBlockComponent';
import BetSubmitButton from './BetSubmitButton';
import NoBetsSubmit from '../NoBets/NoBetsSubmit';

const mapStateToProps = state => ({ bets: state.bets });

// TODO Add Loader
class BetSubmitLayout extends React.Component {
  state = {
    activeIndex: 0,
    competitionsWithBets: [],
    isLoading: true,
  };


  componentDidMount() {
    const competitionsWithBets = [];
    CompetitionService.getAllCompetitions().then((response) => {
      const competitions = response.data;
      const promises = competitions.map(
        competition => BetHttpService.getNbBetsAndMatchesInCompetitionForSubmit(competition.Id),
      );
      Promise.all(promises).then((responses) => {
        responses.forEach((res, index) => {
          if (res.data.NbBet !== undefined) {
            competitions[index].NbBet = res.data.NbBet;
            competitions[index].NbMatch = res.data.NbMatch;
            competitionsWithBets.push(competitions[index]);
          }
        });
        this.setState({
          competitionsWithBets,
          isLoading: false,
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
    const {
      activeIndex, competitionsWithBets, isLoading,
    } = this.state;
    return (
      <div id="betCup">
        <Header as="h1" icon textAlign="center">
          <Icon name="ticket" circular />
          <Header.Content>Available bets</Header.Content>
        </Header>
        {isLoading ? (
          <Loader id="betLoader" size="huge" active inline="centered" />
        ) : (
          competitionsWithBets.length <= 0 ? (
            <NoBetsSubmit />
          ) : (
            <Container fluid>
              <Accordion fluid styled>
                {competitionsWithBets.map((competition, index) => (
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
                        <span>
                          <Icon name="soccer" />
                          {competition.NbMatch + competition.NbBet}
                        </span>
                        <span>
                          <Icon name="ticket" />
                          {competition.NbBet}
                        </span>
                      </Label>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === index}>
                      <BetSubmitBlockComponent competitionId={competition.Id} />
                    </Accordion.Content>
                  </div>
                ))}
              </Accordion>
            </Container>
          )
        )
        }
        <BetSubmitButton />
      </div>
    );
  }
}

const BetSubmit = connect(mapStateToProps)(BetSubmitLayout);
export default BetSubmit;
