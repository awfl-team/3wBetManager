import React from 'react';
import {
  Button, Container, Header, Icon, Label, Menu, Modal,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import ItemService from '../../service/ItemService';
import UserService from '../../service/UserService';
import LootBox from '../ItemModal/LootBox';
import Bomb from '../ItemModal/Bomb';
import Key from '../ItemModal/Key';
import MultiplierByTen from '../ItemModal/MultiplierByTen';
import Item from '../../model/Item';


class Items extends React.Component {
  state = {
    items: [],
    userItems: [],
    activeItem: 'items',
  };

  componentDidMount() {
    ItemService.getAllItems().then((res) => {
      const itemsWithoutLife = res.data.filter(item => item.Type !== 'LIFE');
      this.setState({ items: itemsWithoutLife });
    });
    UserService.getFromToken().then((res) => {
      this.setState({
        userItems: res.data.Items,
      });
    });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { items, userItems, activeItem } = this.state;
    return (
      <div id="items">
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
          <Icon name="bolt" circular />
          <Header.Content>3wItems</Header.Content>
        </Header>
        <Container textAlign="center" fluid>
          <div id="items-container" className="shop">
            {items.map(item => (
              <div key={item.Id} className="item-card">
                <Label floating className="greenLabel">
                  {userItems.filter(i => i.Type === item.Type).length}
                </Label>
                <div className="loot">
                  <div className="loot-title">
                    <h3 className="item-name">{item.Name}</h3>
                  </div>
                  <div className={
                    `loot-image ${
                      item.Rarity === Item.RARITY_LEGENDARY ? 'legendary' : ''
                    || item.Rarity === Item.RARITY_RARE ? 'rare' : ''
                    || item.Rarity === Item.RARITY_EPIC ? 'epic' : ''
                    || item.Rarity === Item.RARITY_COMMON ? 'common' : ''}`
                  }
                  >
                    <img
                      alt="item"
                      src={
                        `assets/images/${
                          item.Type === Item.TYPE_BOMB ? 'bomb-x1.svg' : ''
                          || item.Type === Item.TYPE_KEY ? 'key-x1.svg' : ''
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
                    <Modal
                      trigger={(
                        <Button
                          inverted
                          color="green"
                          onClick={this.handleOpen}
                          disabled={userItems.filter(i => i.Type === item.Type).length === 0}
                        >
                          <Icon name="bolt" />
                        </Button>
                      )}
                      className="item-modal"
                      closeIcon
                    >
                      {(() => {
                        switch (item.Type) {
                          case Item.TYPE_LOOT_BOX:
                            return <LootBox />;
                          case Item.TYPE_BOMB:
                            return <Bomb />;
                          case Item.TYPE_KEY:
                            return <Key />;
                          case Item.TYPE_MULTIPLY_BY_TEN:
                            return <MultiplierByTen />;
                          default:
                            return null;
                        }
                      })()}
                    </Modal>
                  </Button.Group>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Items;
