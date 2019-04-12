import React from 'react';
import {
  Button, Container, Header, Icon, Label, Menu,
} from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import ItemService from '../../service/ItemService';
import UserService from '../../service/UserService';
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
    const {
      items, userItems, activeItem,
    } = this.state;
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
                  {userItems.filter(i => i.Type === item.Type).length > 0
                  && (
                  <Button.Group size="large">
                    {item.Type === Item.TYPE_BOMB
                    && (
                    <Link to="/bomb" className="button ui green inverted small icon">
                      <Icon name="bolt" />
                    </Link>
                    )
                    }
                    {item.Type === Item.TYPE_KEY
                    && (
                      <Link to="/key" className="button ui green inverted small icon">
                        <Icon name="bolt" />
                      </Link>
                    )
                    }
                    {item.Type === Item.TYPE_MULTIPLY_BY_TEN
                    && (
                      <Link to="/multiplierbyten" className="button ui green inverted small icon">
                        <Icon name="bolt" />
                      </Link>
                    )
                    }
                    {item.Type === Item.TYPE_LOOT_BOX
                    && (
                      <Link to="/lootbox" className="button ui green inverted small icon">
                        <Icon name="bolt" />
                      </Link>
                    )
                    }
                  </Button.Group>
                  )
                  }
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
