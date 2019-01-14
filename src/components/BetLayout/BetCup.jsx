import React from 'react';
import { Accordion, Container, Icon } from 'semantic-ui-react';
import BetRow from './BetRow';
import CompetitionService from '../../service/CompetionService';

class BetCup extends React.Component {
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
        <Container fluid>
          <Accordion fluid styled>
            {competitions.map((competition, index) => (
              <div key={competition.Id}>
                <Accordion.Title
                  active={activeIndex === index}
                  index={index}
                  onClick={this.handleClick}
                >
                  <Icon name="dropdown" />
                  {competition.Name}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === index}>
                  <BetRow competitionId={competition.Id} />
                </Accordion.Content>
              </div>
            ))}
          </Accordion>
        </Container>
      </div>
    );
  }
}

export default BetCup;
