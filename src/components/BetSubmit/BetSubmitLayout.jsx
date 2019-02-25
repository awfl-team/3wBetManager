import React from 'react';
import {
  Accordion, Button, Container, Header, Icon, Label, Loader, Modal,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import CompetitionService from '../../service/CompetionService';
import { purgeTableBet } from '../../actions/TableBetActions';
import BetService from '../../service/BetService';
import { addSnackBar } from '../../actions/SnackBarActions';
import BetSubmitBlockComponent from './BetSubmitBlockComponent';

const mapStateToProps = state => ({ bets: state.bets });

function mapDispatchToProps(dispatch) {
  return {
    purgeTableBet: () => dispatch(purgeTableBet()),
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class BetSubmitLayout extends React.Component {
  state = {
    activeIndex: 0,
    competitions: [],
    competitionsWithBets: [],
    modalOpen: false,
    betsLength: 0,
    isDisabled: false,
    loading: true,
  };


  componentDidMount() {
    CompetitionService.getAllCompetions().then((response) => {
      this.setState({ competitions: response.data });
      this.state.competitions.map((competition) => {
        BetService.getCurrentBetAndMatches(competition.Id).then((rep) => {
          if (rep.data.Matches.length > 0) {
            this.setState(
              { competitionWithBets: this.state.competitionsWithBets.push(competition) },
            );
            this.setState({ loading: false });
          }
        });
      });
    });
  }

  handleOpen = () => {
    const bets = this.props.bets;
    this.setState({ betsLength: bets.length });
    this.setState({ modalOpen: true });
  };

  handleClose = () => this.setState({ modalOpen: false });

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleSubmit = () => {
    BetService.AddOrUpdateBet(this.props.bets).then(() => {
      this.props.addSnackbar({
        message: 'Successfully added bets !',
        type: 'success',
      });
      this.props.purgeTableBet();
      this.handleClose();
    });
  };


  render() {
    const {
      activeIndex, betsLength, modalOpen, competitionsWithBets, loading,
    } = this.state;

    const isDisabled = (this.props.bets.length > 0);
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
                            <Icon name="ticket" />
                            {' '}
0
                          </span>
                        <span>
                            <Icon name="soccer" />
                            {' '}
0
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
        <Container fluid className="submit-bets-action">
          <Modal
            trigger={(
              <Button
                onClick={this.handleOpen}
                type="submit"
                className="submit-bets-action-button"
                disabled={!isDisabled}
                color="green"
              >
                      Submit
              </Button>
                )}
            open={modalOpen}
            onClose={this.handleClose}
            basic
            size="small"
          >
            <Header
              icon="exclamation triangle"
              content="Are you sure ?"
              as="h1"
              textAlign="center"
            />
            <Modal.Content>
              <h3>
                  If you add or update
                {betsLength > 1 ? ' those ' : ' this '}
                  bets, it will cost you
                {' '}
                {betsLength * 10}
                {' '}
                <Icon color="yellow" name="copyright" />
              </h3>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={this.handleClose} inverted>
                <Icon name="remove" />
                  No
              </Button>
              <Button color="green" onClick={this.handleSubmit} inverted>
                <Icon name="checkmark" />
                  Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </Container>
      </div>
    );
  }
}

const BetSubmit = connect(mapStateToProps, mapDispatchToProps)(BetSubmitLayout);
export default BetSubmit;
