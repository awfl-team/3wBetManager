import React from 'react';
import {
  Accordion, Container, Header, Icon, Label, Loader,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import CompetitionService from '../../services/CompetionService';
import BetService from '../../services/BetService';
import BetSubmitBlockComponent from './BetSubmitBlockComponent';
import BetSubmitButton from './BetSubmitButton';

const mapStateToProps = state => ({ bets: state.bets });

// TODO Add Loader
class BetSubmitLayout extends React.Component {
  state = {
    activeIndex: 0,
    competitionsWithBets: [],
    loading: true,
  };


  componentDidMount() {
    const competitionsWithBets = [];
    CompetitionService.getAllCompetitions().then((response) => {
      const competitions = response.data;
      const promises = competitions
        .map(competition => BetService.getNbBetsAndMatchesInCompetitionForSubmit(competition.Id));
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
          loading: false,
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
      activeIndex, competitionsWithBets, loading,
    } = this.state;
    return (
      <div id="betCup">
        <Header as="h1" icon textAlign="center">
          <Icon name="ticket" circular />
          <Header.Content>Available bets</Header.Content>
        </Header>
        {competitionsWithBets.length > 0 && loading === false
          ? (
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
          ) : competitionsWithBets.length === 0 && loading === false
            ? (
              <div className="noBetFound">
                <div className="ui middle aligned center aligned fullpage">
                  <div className="column">
                    <h2 className="ui teal authentication-header">
                      <div className="content">
                        <p className="noBetFound-header">No bets found at the moment</p>
                        <p className="back-button">Click here to reload the page</p>
                      </div>
                    </h2>
                  </div>
                </div>
              </div>
            )
            : <Loader id="betLoader" size="huge" active inline="centered" />
          }
        <BetSubmitButton />
      </div>
    );
  }
}

const BetSubmit = connect(mapStateToProps)(BetSubmitLayout);
export default BetSubmit;
