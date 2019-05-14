import React from 'react';
import {
  Button, Header, Icon, Menu, Modal,
} from 'semantic-ui-react';

class Help extends React.Component {
  state = {
    modalOpen: false,
  };

  handleOpenModal = () => this.setState({ modalOpen: true });

  handleCloseModal = () => this.setState({ modalOpen: false });

  render() {
    const { modalOpen } = this.state;
    return (
      <Modal
        trigger={<Menu.Item as="a" onClick={this.handleOpenModal}>
          <Icon name="help circle" />
        </Menu.Item>}
        open={modalOpen}
        onClose={this.handleCloseModal}
        basic={true}
        size="small"
      >
        <Header icon="soccer" content="How it works :" as="h1" textAlign="center" />
        <Modal.Content>
          <h3>Profile :</h3>
          <p>
            You can manage your account there.
            In addition, you can see how many
            {' '}
            <Icon color="yellow" name="copyright" />
            {' '}
and lives you have.
            {' '}
            <br />
            If you lost too many
            {' '}
            <Icon color="yellow" name="copyright" />
            {' '}
or want to restart from scratch, you can reset your account !
            {' '}
            <br />
            <br />
            It'll cost you one
            {' '}
            <img alt="icon" src="assets/images/life-x1.svg" className="icon-image" />
            {' '}
            and reset your
            {' '}
            <Icon color="yellow" name="copyright" />
            {' '}
wallet to 500
            {' '}
            <Icon color="yellow" name="copyright" />
.
          </p>

          <h3>Statistics</h3>
          <p>
Consult your detailed statistics and follow your progression.
            <br />
You can filter your datas by many ways.
            {' '}
          </p>

          <h3>Bets :</h3>
          <p>
            Stay tunned daily to bet on future matches and see your results.
            <br />
            <br />
            Submit a bet is free (in sort of) :
            {' '}
            <br />
It's only cost some
            {' '}
            <Icon color="yellow" name="copyright" />
.
            You are allowed to change your bets until
            the concerned match starts but it'll cost you additional
            {' '}
            <Icon color="yellow" name="copyright" />
.
          </p>

          <h3>Results</h3>
          <p>
            You can consult your earned
            {' '}
            <Icon color="yellow" name="copyright" />
            {' '}
and
            the matches results for each match you have submited a bet for.
          </p>

          <h3>
            Shop & Items
            <span role="img" aria-label="cocomongo"> &#129381; &#x1F96D;</span>
          </h3>
          <p>
            Let's play a game !
            <br />
            You can buy items like
            {' '}
            <img alt="icon" src="assets/images/bomb-x1.svg" className="icon-image" />
            ,
            {' '}
            <img alt="icon" src="assets/images/life-x1.svg" className="icon-image" />
            ,
            {' '}
            <img alt="icon" src="assets/images/lootbox.svg" className="icon-image" />
            {' '}
            and more ! Items are either
            {' '}
            <span className="common">Common</span>
            ,
            {' '}
            <span className="rare">Rare</span>
            ,
            {' '}
            <span className="epic">Epic</span>
            {' '}
            or
            {' '}
            <span className="legendary">Legendary</span>
            {' '}
            !
            <br />
            Use those items on other players or on your bets to increase your incomes.
            <br />
            Open a lootbox to get random items !
          </p>
          <p>
            It'll only cost you some
            {' '}
            <Icon color="yellow" name="copyright" />
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleCloseModal} inverted={true}>
            <Icon name="checkmark" />
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default Help;
