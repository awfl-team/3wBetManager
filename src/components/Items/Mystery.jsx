import React from 'react';
import {
  Container, Header, Icon, Image, Menu,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import ItemHttpService from '../../httpServices/ItemHttpService';
import Item from '../../model/Item';
import UserHttpService from '../../httpServices/UserHttpService';
import AudioHandlerHelper from '../../helpers/AudioHandlerHelper';

let randomizer;
let lootResult;

class Mystery extends React.Component {
  state = {
    items: [],
    itemLooted: Item,
    nbMysteryBox: 0,
    activeItem: 'items',
    isLooting: false,
    isDisabled: false,
  };

  componentDidMount() {
    ItemHttpService.getAllItems().then((res) => {
      const items = res.data;
      this.setState({ items });
    });
    UserHttpService.getFromToken().then((res) => {
      this.setState({
        nbMysteryBox: res.data.Items.filter(item => item.Type === Item.TYPE_MYSTERY).length,
      });
    });
  }

  componentWillUnmount() {
    clearTimeout(randomizer);
    clearTimeout(lootResult);
  }

  openLootBox = () => {
    this.setState({ isDisabled: true });
    if (this.state.nbMysteryBox > 0) {
      this.hideLoot();
      randomizer = setTimeout(() => {
        document.getElementById('loot-slide').style.width = document.getElementById('slide-comp-1').offsetWidth.toString();
        this.showRandomizer();
        this.setState({ isLooting: true });

        AudioHandlerHelper.startLoot();
        lootResult = setTimeout(() => {
          ItemHttpService.useMystery().then((res) => {
            const legendaryItems = [];
            if (res.data.Rarity === Item.RARITY_LEGENDARY) {
              legendaryItems.push(res.data);
            }
            if (legendaryItems.length > 0) {
              AudioHandlerHelper.openedLoot(true);
            } else {
              AudioHandlerHelper.openedLoot(false);
            }
            this.hideRandomizer();
            this.showLoot();
            this.setState(prevState => ({ nbMysteryBox: prevState.nbMysteryBox - 1 }));
            this.setState({
              isLooting: false,
              itemLooted: res.data,
              isDisabled: false,
            });
          }).catch(() => {
            this.setState({ isDisabled: false });
          });
        }, 3000);
      }, 100);
    }
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

  hideLoot = () => {
    document.getElementById('loot-container').classList.add('hide');
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const {
      items, itemLooted, nbMysteryBox, activeItem, isLooting, isDisabled,
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
            <div className="header-custom-image-container">
              <Image src="assets/images/mystery.svg" className="image-icon-header" />
            </div>
            <Header.Content>
              Mystery Box (
              {nbMysteryBox}
              )
            </Header.Content>
          </Header>
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
                            || item.Type === Item.TYPE_MULTIPLY_BY_FIVE ? 'multiplier-x5.svg' : ''
                            || item.Type === Item.TYPE_MULTIPLY_BY_TWO ? 'multiplier-x2.svg' : ''
                            || item.Type === Item.TYPE_MYSTERY ? 'mystery.svg' : ''
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
                            || item.Type === Item.TYPE_MULTIPLY_BY_FIVE ? 'multiplier-x5.svg' : ''
                            || item.Type === Item.TYPE_MULTIPLY_BY_TWO ? 'multiplier-x2.svg' : ''
                            || item.Type === Item.TYPE_MYSTERY ? 'mystery.svg' : ''
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
              <Header.Content>
                There it is !
                (
                {nbMysteryBox}
                {' '}
                to open
                )
              </Header.Content>
            </Header>
            <div>
              <div className="loot" key={itemLooted.Id}>
                <div className="loot-title">
                  <h3 className="itemLooted-name">{itemLooted.Name}</h3>
                </div>
                <div className={
                  `loot-image ${
                    itemLooted.Rarity === 'Legendary' ? 'legendary' : ''
                    || itemLooted.Rarity === 'Rare' ? 'rare' : ''
                    || itemLooted.Rarity === 'Epic' ? 'epic' : ''
                    || itemLooted.Rarity === 'Common' ? 'common' : ''}`
                }
                >
                  <img
                    alt="itemLooted"
                    src={
                      `assets/images/${
                        itemLooted.Type === Item.TYPE_BOMB ? 'bomb-x1.svg' : ''
                        || itemLooted.Type === Item.TYPE_KEY ? 'key-x1.svg' : ''
                        || itemLooted.Type === Item.TYPE_LIFE ? 'life-x1.svg' : ''
                        || itemLooted.Type === Item.TYPE_MULTIPLY_BY_TEN ? 'multiplier-x10.svg' : ''
                        || itemLooted.Type === Item.TYPE_MULTIPLY_BY_FIVE ? 'multiplier-x5.svg' : ''
                        || itemLooted.Type === Item.TYPE_MULTIPLY_BY_TWO ? 'multiplier-x2.svg' : ''
                        || itemLooted.Type === Item.TYPE_MYSTERY ? 'mystery.svg' : ''
                        || itemLooted.Type === Item.TYPE_LOOT_BOX ? 'lootbox.svg' : ''}`
                    }
                  />
                </div>
                <div className="loot-description">
                  {itemLooted.Description}
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div className="ui fluid container submit-bets-action">
          <button
            type="button"
            className="ui green button submit-bets-action-button"
            tabIndex="-1"
            onClick={this.openLootBox}
            disabled={
              isDisabled === true
              || nbMysteryBox <= 0
              || isLooting === true}
          >
            Open
          </button>
        </div>
      </div>
    );
  }
}

export default Mystery;
