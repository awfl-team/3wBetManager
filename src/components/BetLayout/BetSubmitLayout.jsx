import React from 'react';
import {
  Accordion, Button, Container, Icon,
} from 'semantic-ui-react';
import BetSubmitRowComponent from './BetSubmitRowComponent';
import CompetitionService from '../../service/CompetionService';

class BetSubmitLayout extends React.Component {
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
                  <BetSubmitRowComponent competitionId={competition.Id} />
                </Accordion.Content>
              </div>
            ))}
          </Accordion>
        </Container>
        <Container fluid className="submit-bets-action">
          <Button type="submit" color="green">Submit</Button>
        </Container>
      </div>
    );
  }
}

export default BetSubmitLayout;
