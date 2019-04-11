import React from 'react';
import {
  Button, Container, Header, Icon, Menu,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import ItemService from '../../service/ItemService';
import User from '../../model/User';
import UserService from '../../service/UserService';
import { addSnackBar } from '../../actions/SnackBarActions';

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
    totalCost: 0,
    activeItem: 'shop',
  };

  componentDidMount() {
    ItemService.getAllItems().then((res) => {
      this.setState({ items: res.data });
    });
    UserService.getFromToken().then((res) => {
      this.setState({ user: res.data });
    });
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
        this.setState({ itemsBought: [] });
        this.props.addSnackbar({
          message: 'Items buy',
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
      items, itemsBought, totalCost, activeItem, user,
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
                          item.Type === 'BOMB' ? 'bomb-x1.svg' : ''
                          || item.Type === 'KEY' ? 'key-x1.svg' : ''
                          || item.Type === 'LIFE' ? 'life-x1.svg' : ''
                          || item.Type === 'MULTIPLY_BY_TEN' ? 'multiplier-x10.svg' : ''
                          || item.Type === 'LOOT_BOX' ? 'lootbox.svg' : ''}`
                      }
                    />
                  </div>
                  <div className="loot-description">
                    {item.Description}
                  </div>
                </div>
                <div className="item-card-bottom">
                  <Button.Group size="large">
                    <Button onClick={() => this.handleChange(-1, item)} inverted color="red">
                      <Icon name="minus" />
                    </Button>
                    <Button.Or text={itemsBought.filter(i => i.Type === item.Type).length} />
                    <Button onClick={() => this.handleChange(1, item)} inverted color="green">
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
