import React from 'react';
import {Accordion, Container, Header, Icon, Label} from 'semantic-ui-react';
import CompetitionService from '../../service/CompetionService';
import BetRowResult from './BetRowResult';
import withAuth from '../AuthGuard/AuthGuard';

class BetLayoutResult extends React.Component {
  state = {
    activeIndex: 0,
    competitions: [],
  };

  componentDidMount() {
    CompetitionService.getAllCompetions().then((response) => {
      this.setState({ competitions: response.data });
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
                  <Label attached='top right'>
                    <Icon name='ticket' /> 0
                  </Label>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === index}>
                  <BetRowResult competitionId={competition.Id} />
                </Accordion.Content>
              </div>
            ))}
          </Accordion>
        </Container>
      </div>
    );
  }
}

export default withAuth(BetLayoutResult);
