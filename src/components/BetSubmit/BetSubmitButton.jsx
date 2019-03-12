import React from 'react';
import {
  Button, Container, Header, Icon, Modal,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { purgeTableBet, setTableBet } from '../../actions/TableBetActions';
import BetService from '../../service/BetService';
import { addSnackBar } from '../../actions/SnackBarActions';

const mapStateToProps = state => ({ bets: state.bets });

function mapDispatchToProps(dispatch) {
  return {
    purgeTableBet: () => dispatch(purgeTableBet()),
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
    setTableBet: bets => dispatch(setTableBet(bets)),
  };
}

// TODO Add Loader
class BetSubmitButtonComponent extends React.Component {
  state = {
    modalOpen: false,
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => this.setState({ modalOpen: false });

  handleSubmit = () => {
    const { bets } = this.props;
    BetService.AddOrUpdateBet(bets.filter(bet => bet.alreadyUpdated === false))
      .then((responses) => {
        this.props.addSnackbar({
          message: 'Successfully added bets !',
          type: 'success',
        });
        const updatedBets = [];
        // retrieve new bets from POST response
        responses.forEach((res) => {
          if (Array.isArray(res.data)) {
            res.data.forEach((bet) => {
              bet.alreadyUpdated = true;
              updatedBets.push(bet);
            });
          }
        });
        // set updated bets into reducer
        bets.filter(bet => bet.Id !== undefined).forEach((bet) => {
          bet.alreadyUpdated = true;
          updatedBets.push(bet);
        });

        this.props.setTableBet(updatedBets);
        this.handleClose();
      });
  };


  render() {
    const { modalOpen } = this.state;
    const { bets } = this.props;
    const isDisabled = (bets.filter(bet => bet.alreadyUpdated === false).length > 0);
    return (
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
    );
  }
}

const BetSubmitButton = connect(mapStateToProps, mapDispatchToProps)(BetSubmitButtonComponent);
export default BetSubmitButton;
