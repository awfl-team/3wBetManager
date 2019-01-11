import React from 'react';
import {Accordion, Container, Icon} from 'semantic-ui-react';
import BetRow from "./BetRow";

class BetCup extends React.Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state;

    return (
        <div id="betCup">
          <Container fluid>
            <Accordion fluid styled>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Cup #1
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <BetRow/>
              </Accordion.Content>
              <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Cup #2
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <BetRow/>
              </Accordion.Content>
            </Accordion>
          </Container>
        </div>
    );
  }
}

export default BetCup;
