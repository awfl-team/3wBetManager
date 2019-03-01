import React from 'react';
import {
  Accordion, Button, Container, Header, Icon, Label, Loader, Modal,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import CompetitionService from '../../service/CompetionService';
import { purgeTableBet, setTableBet } from '../../actions/TableBetActions';
import BetService from '../../service/BetService';
import { addSnackBar } from '../../actions/SnackBarActions';
import BetSubmitBlockComponent from './BetSubmitBlockComponent';

const mapStateToProps = state => ({ bets: state.bets });

function mapDispatchToProps(dispatch) {
  return {
    purgeTableBet: () => dispatch(purgeTableBet()),
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
    setTableBet: bets => dispatch(setTableBet(bets)),
  };
}
// TODO Add Loader
class BetSubmitLayout extends React.Component {
  state = {
    activeIndex: 0,
    competitions: [],
    competitionsWithBets: [],
    modalOpen: false,
    loading: true,
  };


  componentDidMount() {
    this.init();
  }

  handleOpen = () => {
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
    const { bets } = this.props;
    BetService.AddOrUpdateBet(bets.filter(bet => bet.alreadyUpdated === false))
      .then((responses) => {
        this.props.addSnackbar({
          message: 'Successfully added bets !',
          type: 'success',
        });
        this.props.purgeTableBet();
        const updatedBets = [];
        responses.forEach((res) => {
          res.data.forEach((bet) => {
            bet.alreadyUpdated = true;
            updatedBets.push(bet);
          });
        });
        this.props.setTableBet(updatedBets);
        this.init();
        this.handleClose();
      });
  };

  init() {
    const competitionsWithNbBetAndNbMatch = [];
    CompetitionService.getAllCompetitions().then((response) => {
      this.setState({ competitions: response.data });
      this.state.competitions.forEach((competition) => {
        BetService.getNbBetsAndMatchesInCompetitionForSubmit(competition.Id).then((res) => {
          if (res.data.NbBet !== undefined) {
            competition.NbBet = res.data.NbBet;
            competition.NbMatch = res.data.NbMatch;
            competitionsWithNbBetAndNbMatch.push(competition);
            /*    this.setState({
              competitionWithBets:
                  this.state.competitionsWithBets.push(competition),
            }); */
            this.setState({ loading: false });
          }
        });
      });
    });
  }


  render() {
    const {
      activeIndex, modalOpen, competitionsWithBets, loading,
    } = this.state;
    const { bets } = this.props;
    const isDisabled = (this.props.bets.filter(bet => bet.alreadyUpdated === false).length > 0);
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
                          {competition.NbBet}
                        </span>
                        <span>
                          <Icon name="soccer" />
                          {competition.NbMatch}
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
                {bets.filter(bet => bet.alreadyUpdated === false).length > 1 ? ' those ' : ' this '}
                  bets, it will cost you
                {' '}
                {bets.filter(bet => bet.alreadyUpdated === false).length * 10}
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
