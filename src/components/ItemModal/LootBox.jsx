import React from 'react';
import {
  Button,
  Container,
  Header, Icon, Image, Menu,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import ItemService from '../../service/ItemService';
import Item from '../../model/Item';
import UserService from '../../service/UserService';

let randomizer;
let lootResult;

class LootBox extends React.Component {
  state = {
    items: [],
    itemsLooted: [],
    nbLootbox: 0,
    activeItem: 'items',
  };

  componentDidMount() {
    ItemService.getAllItems().then((res) => {
      const itemsWithoutLife = res.data.filter(item => item.Type !== Item.TYPE_LIFE);
      this.setState({ items: itemsWithoutLife });
    });
    UserService.getFromToken().then((res) => {
      this.setState({
        nbLootbox: res.data.Items.filter(item => item.Type === Item.TYPE_LOOT_BOX).length,
      });
    });
  }

  componentWillUnmount() {
    clearTimeout(randomizer);
    clearTimeout(lootResult);
  }

  openLootBox = () => {
    randomizer = setTimeout(() => {
      document.getElementById('loot-slide').style.width = document.getElementById('slide-comp-1').offsetWidth.toString();
      this.showRandomizer();
      lootResult = setTimeout(() => {
        this.setState({ itemsLooted: [] });
        ItemService.useLoot().then((res) => {
          this.setState({ itemsLooted: res.data });
          this.hideRandomizer();
          this.showLoot();
        });
      }, 3000);
    }, 100);
  }

  fakeLoot = () => {
    this.setState({ itemsLooted: [] });
    ItemService.useLoot().then((res) => {
      this.setState({ itemsLooted: res.data });
      this.setState(prevState => ({ nbLootbox: prevState.nbLootbox + 1 }));
      this.showLoot();
    });
  }

  showRandomizer = () => {
    document.getElementById('loot-slide-container').classList.remove('hide');
    document.getElementById('loot-action-container').classList.add('hide');
  };

  hideRandomizer = () => {
    document.getElementById('loot-slide-container').classList.add('hide');
  };

  showLoot = () => {
    document.getElementById('loot-container').classList.remove('hide');
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const {
      items, itemsLooted, nbLootbox, activeItem,
    } = this.state;
    return (
      <div id="lootbox">
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
        <div id="loot-action-container">
          <Header as="h1" icon textAlign="center">
            <Icon name="box" circular />
            <Header.Content>
              Lootbox (
              {nbLootbox}
              )
            </Header.Content>
          </Header>
          <Container textAlign="center" fluid>
            <Button.Group>
              <Button id="openAction" onClick={this.openLootBox}>Open my lootbox</Button>
              <Button id="test" onClick={this.fakeLoot}>Fake my loot my lootbox</Button>
            </Button.Group>
          </Container>
        </div>
        <div id="loot-slide-container" className="hide">
          <Header as="h1" icon textAlign="center">
            <Icon name="box" circular />
            <Header.Content>Wait for it </Header.Content>
          </Header>
          <Container textAlign="center" fluid>
            <div id="loot-slide">
              <div id="slide-comp-1">
                {items.map(item => (
                  <div className="loot" key={item.Id}>
                    <div className="loot-title">
                      <h3 className="item-name">{item.Name}</h3>
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
                ))}
              </div>
              <div id="slide-comp-2">
                {items.map(item => (
                  <div className="loot" key={item.Id}>
                    <div className="loot-title">
                      <h3 className="item-name">{item.Name}</h3>
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
                ))}
              </div>
            </div>
          </Container>
        </div>
        <Container textAlign="center" fluid>
          <div id="loot-container" className="hide">
            <Header as="h1" icon textAlign="center">
              <div className="header-custom-image-container">
                <Image src="assets/images/lootbox.svg" className="image-icon-header" />
              </div>
              <Header.Content>There it is ! *mangasme*</Header.Content>
            </Header>
            <div>
              {itemsLooted.map(item => (
                <div className="loot" key={item.Id}>
                  <div className="loot-title">
                    <h3 className="item-name">{item.Name}</h3>
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
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default LootBox;
