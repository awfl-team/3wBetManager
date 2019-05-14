import React from 'react';
import {
  Button, Container, Header, Icon, Image, Label, Menu, Table,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserService from '../../service/UserService';
import ItemService from '../../service/ItemService';
import { addSnackBar } from '../../actions/SnackBarActions';
import Item from '../../model/Item';
import AudioHandlerHelper from '../../helpers/AudioHandlerHelper';
import User from '../../model/User';

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class Bomb extends React.Component {
  state = {
    userAmongSiblings: [],
    nbBombs: 0,
    currentUser: User,
    activeItem: 'items',
    isDisabled: false,
  };

  componentDidMount() {
    UserService.getCurrentUserAmongSiblings().then(((response) => {
      this.setState({
        userAmongSiblings: response.data,
      });
    }));

    UserService.getFromToken().then((res) => {
      this.setState({
        currentUser: res.data,
        nbBombs: res.data.Items.filter(item => item.Type === Item.TYPE_BOMB).length,
      });
    });
  }

  handleClick = (userId, event) => {
    const elem = event.target;
    this.setState({ isDisabled: true });
    if (this.state.nbBombs > 0) {
      ItemService.useBomb(userId).then(() => {
        this.props.addSnackbar({
          message: 'Bomb used',
          type: 'success',
        });
        this.setState(prevState => ({ nbBombs: prevState.nbBombs - 1 }));
        Bomb.handleButtonAnimationShow(elem);
        setTimeout(() => {
          Bomb.handleButtonAnimationHide(elem);
        },         500);
        UserService.getCurrentUserAmongSiblings().then(((response) => {
          this.setState({
            userAmongSiblings: response.data,
            isDisabled: false,
          });
        }));
      }).catch(() => {
        this.setState({
          isDisabled: false,
        });
      });
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  static handleButtonAnimationShow(elem) {
    const bombAnimation = elem.closest('.buttons').getElementsByClassName('bomb-animation')[0];
    const buttonImage = elem.closest('.buttons').getElementsByClassName('image-icon-button')[0];
    bombAnimation.classList.add('show');
    bombAnimation.classList.remove('hide');
    buttonImage.classList.add('hide');
    buttonImage.classList.remove('show');
    AudioHandlerHelper.useBomb();
  }

  static handleButtonAnimationHide(elem) {
    const bombAnimation = elem.parentElement.parentElement.getElementsByClassName(
      'bomb-animation')[0];
    const buttonImage = elem.parentElement.parentElement.getElementsByClassName(
      'image-icon-button')[0];
    bombAnimation.classList.add('hide');
    bombAnimation.classList.remove('show');
    buttonImage.classList.add('show');
    buttonImage.classList.remove('hide');
  }

  render() {
    const {
      userAmongSiblings, nbBombs, activeItem, currentUser, isDisabled,
    } = this.state;

    return (
      <div id="bomb">
        <Container fluid={true}>
          <div id="inlineMenu">
            <Menu>
              <Menu.Item
                as={NavLink}
                name="shop"
                onClick={this.handleItemClick}
                active={activeItem === 'shop'}
                to="/shop"
              >
                Shop
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                name="items"
                onClick={this.handleItemClick}
                active={activeItem === 'items'}
                to="/items"
              >
                My items
              </Menu.Item>
            </Menu>
          </div>
        </Container>
        <Header as="h1" icon={true} textAlign="center">
          <div className="header-custom-image-container">
            <Image src="assets/images/bomb-x1.svg" className="image-icon-header" />
          </div>
          <Header.Content>
            Bomb (
            {nbBombs}
            )
          </Header.Content>
        </Header>
        <Container textAlign="center" fluid={true}>
          <div className="scrollable-table-container">
            <Table
              celled={true}
              structured={true}
              inverted={true}
              compact={true}
              unstackable={true}
              className="primary-bg"
            >
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell rowSpan="2">Username</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Score</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Lives</Table.HeaderCell>
                  <Table.HeaderCell colSpan="3">Nb bets per type</Table.HeaderCell>
                  <Table.HeaderCell rowSpan="2">Actions</Table.HeaderCell>
                </Table.Row>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>
                    <Label className="redLabel">Wrong</Label>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Label className="orangeLabel">Ok</Label>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Label className="greenLabel">Perfect</Label>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {userAmongSiblings.length > 0
                  && userAmongSiblings.map(user => (
                    <Table.Row key={user.Id} textAlign="center" active={user.IsCurrent}>
                      <Table.Cell>{user.Username}</Table.Cell>
                      <Table.Cell>
                        <span>{user.Point}</span>
                        {' '}
                        <Icon color="yellow" name="copyright" size="large" />
                      </Table.Cell>
                      <Table.Cell>
                        <div>
                          <span>{user.Life}</span>
                          {' '}
                          <Icon color="red" name="heart" size="large" />
                        </div>
                      </Table.Cell>
                      <Table.Cell>{user.NbWrongBets}</Table.Cell>
                      <Table.Cell>{user.NbOkBets}</Table.Cell>
                      <Table.Cell>{user.NbPerfectBets}</Table.Cell>
                      <Table.Cell textAlign="center">
                        <Button.Group className="button-position-reference">
                          <Button
                            onClick={e => this.handleClick(user.Id, e)}
                            inverted={true}
                            className="green"
                            fluid={true}
                            disabled={
                              isDisabled === true
                              || nbBombs <= 0
                              || currentUser.Username === user.Username
                            }
                          >
                            <div className="bomb-animation hide">
                              <img alt="anim" src="assets/images/explosion.gif" />
                            </div>
                            <div className="custom-button-image-container">
                              <Image
                                src="assets/images/bomb-x1.svg"
                                className="image-icon-button"
                              />
                            </div>
                          </Button>
                        </Button.Group>
                      </Table.Cell>
                    </Table.Row>
                  ))}

              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
    );
  }
}

const bomb = connect(null, mapDispatchToProps)(Bomb);
export default bomb;
