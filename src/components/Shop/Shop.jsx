import React from 'react';
import {
  Button, Container, Header, Icon, Label, Menu,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import ItemService from '../../service/ItemService';
import User from '../../model/User';
import Item from '../../model/Item';
import UserService from '../../service/UserService';
import { addSnackBar } from '../../actions/SnackBarActions';
import AudioHandlerService from '../../service/AudioHandlerService';

let longPressInterval;
let longPressBuffer;
let themeHandler;

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}


class Shop extends React.Component {
  state = {
    user: User,
    items: [],
    itemsBought: [],
    userItems: [],
    totalCost: 0,
    activeItem: 'shop',
    theme: null,
    isThemeActive: false,
  };

  componentDidMount() {
    ItemService.getAllItems().then((res) => {
      this.setState({ items: res.data });
    });
    UserService.getFromToken().then((res) => {
      this.setState({
        user: res.data,
        userItems: res.data.Items,
      });
    });
    this.handleKeyboard();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', themeHandler);
  }

  handleKeyboard = () => {
    let sequence = [];
    themeHandler = (event) => {
      sequence.push(event.key.toLowerCase());
      if (sequence.length > 9) {
        sequence = [];
      }
      const sequenceString = sequence.join('');
      if (sequenceString === 'cocomongo' && this.state.theme === null) {
        this.setState({ theme: AudioHandlerService.initTheme() });
        this.setState({ isThemeActive: true });
        sequence = [];
      } else if (sequenceString === 'cocomongo' && this.state.isThemeActive === true && this.state.theme !== null) {
        AudioHandlerService.muteTheme(this.state.theme);
        this.setState({ isThemeActive: false });
        sequence = [];
      } else if (sequenceString === 'cocomongo' && this.state.isThemeActive === false && this.state.theme !== null) {
        AudioHandlerService.resumeTheme(this.state.theme);
        this.setState({ isThemeActive: true });
        sequence = [];
      } else if (sequenceString === 'reset') {
        AudioHandlerService.muteTheme(this.state.theme);
        this.setState({ theme: AudioHandlerService.initTheme() });
        this.setState({ isThemeActive: true });
        sequence = [];
      }
    };
    document.addEventListener('keydown', themeHandler);
  };

  handleButtonPress = (item, direction) => {
    let i = 0;
    longPressBuffer = setTimeout(() => {
      longPressInterval = setInterval(() => {
        if (direction > 0) {
          i = +1;
        } else {
          i = -1;
        }
        this.handleChange(i, item);
      }, 70);
    }, 500);
  }

  handleButtonRelease = () => {
    clearTimeout(longPressBuffer);
    clearInterval(longPressInterval);
  }

  handleChange = (number, item) => {
    const { itemsBought } = this.state;
    let totalCost = 0;
    if (number === -1) {
      if (itemsBought.indexOf(item) !== -1) {
        itemsBought.splice(itemsBought.indexOf(item), 1);
      }
    } else {
      itemsBought.push(item);
    }
    this.setState({ itemsBought });
    itemsBought.forEach((i) => {
      totalCost += i.Cost;
    });
    this.setState({ totalCost });
  };

  handleSubmit = () => {
    const { user, itemsBought, totalCost } = this.state;
    if (totalCost <= user.Point) {
      ItemService.addItemsToUser(itemsBought).then(() => {
        user.Point -= totalCost;
        this.setState(
          { itemsBought: [], user, totalCost: 0 },
        );
        UserService.getFromToken().then((res) => {
          this.setState({
            user: res.data,
            userItems: res.data.Items,
          });
        });
        this.props.addSnackbar({
          message: 'Items bought',
          type: 'success',
        });
      });
    } else {
      this.props.addSnackbar({
        message: 'You don\' t have enough points',
        type: 'danger',
      });
    }
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const {
      items, itemsBought, totalCost, activeItem, user, userItems,
    } = this.state;
    return (
      <div id="3wShop">
        <Container fluid>
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
        <Header as="h2" icon textAlign="center">
          <Icon name="shop" circular />
          <Header.Content>
            3wShop
          </Header.Content>
        </Header>
        <Container textAlign="center" fluid>
          <div className="profile-coins">
            <span>{user.Point}</span>
            {' '}
            <Icon color="yellow" name="copyright" size="big" />
          </div>
          <div id="items-container" className="shop">
            {items.map(item => (
              <div key={item.Id} className="item-card">
                <Label floating className="greenLabel">
                  {userItems.filter(i => i.Type === item.Type).length}
                </Label>
                <div className="loot">
                  <div className="loot-title">
                    <h3 className="item-name">{item.Name}</h3>
                    <span>{item.Cost}</span>
                    {' '}
                    <Icon color="yellow" name="copyright" size="big" />
                  </div>
                  <div className={
                    `loot-image ${
                      item.Rarity === 'Legendary' ? 'legendary' : ''
                      || item.Rarity === 'Rare' ? 'rare' : ''
                      || item.Rarity === 'Epic' ? 'epic' : ''
                      || item.Rarity === 'Common' ? 'common' : ''}`
                  }
                  >
                    <img
                      alt="item"
                      src={
                        `assets/images/${
                          item.Type === Item.TYPE_BOMB ? 'bomb-x1.svg' : ''
                          || item.Type === Item.TYPE_KEY ? 'key-x1.svg' : ''
                          || item.Type === Item.TYPE_LIFE ? 'life-x1.svg' : ''
                          || item.Type === Item.TYPE_MULTIPLY_BY_TEN ? 'multiplier-x10.svg' : ''
                          || item.Type === Item.TYPE_LOOT_BOX ? 'lootbox.svg' : ''}`
                      }
                    />
                  </div>
                  <div className="loot-description">
                    {item.Description}
                  </div>
                </div>
                <div className="item-card-bottom">
                  <Button.Group size="large">
                    <Button
                      onClick={() => this.handleChange(-1, item)}
                      onTouchStart={() => this.handleButtonPress(item, -1)}
                      onTouchEnd={() => this.handleButtonRelease(item, -1)}
                      onMouseDown={() => this.handleButtonPress(item, -1)}
                      onMouseUp={() => this.handleButtonRelease(item, -1)}
                      inverted
                      color="red"
                    >
                      <Icon name="minus" />
                    </Button>
                    <Button.Or text={itemsBought.filter(i => i.Type === item.Type).length} />
                    <Button
                      onClick={() => this.handleChange(1, item)}
                      onTouchStart={() => this.handleButtonPress(item, +1)}
                      onTouchEnd={() => this.handleButtonRelease(item, +1)}
                      onMouseDown={() => this.handleButtonPress(item, +1)}
                      onMouseUp={() => this.handleButtonRelease(item, +1)}
                      inverted
                      color="green"
                    >
                      <Icon name="add" />
                    </Button>
                  </Button.Group>
                </div>
              </div>
            ))}
          </div>
        </Container>
        <div className="ui fluid container submit-bets-action">
          <button
            type="button"
            className="ui green button submit-bets-action-button"
            tabIndex="-1"
            disabled={itemsBought.length === 0}
            onClick={() => this.handleSubmit()}
          >
          Buy
            {' '}
            <span>
              (
              {totalCost}
              {' '}
              <Icon color="yellow" name="copyright" size="large" />
              )
            </span>
          </button>
        </div>
      </div>
    );
  }
}

const shop = connect(null, mapDispatchToProps)(Shop);
export default shop;
