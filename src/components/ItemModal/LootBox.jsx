import React from 'react';
import { Header, Icon, Modal } from 'semantic-ui-react';
import ItemService from '../../service/ItemService';

let randomizer;
let lootResult;

class LootBox extends React.Component {
  state = {
    items: [],
  };

  componentDidMount() {
    ItemService.getAllItems().then((res) => {
      const itemsWithoutLife = res.data.filter(item => item.Type !== 'LIFE');
      this.setState({ items: itemsWithoutLife });
      randomizer = setTimeout(() => {
        document.getElementById('loot-slide').style.width = document.getElementById('slide-comp-1').offsetWidth.toString();
        this.showRandomizer();
        lootResult = setTimeout(() => {
          this.hideRandomizer();
          this.showLoot();
        }, 3000);
      }, 100);
    });
  }

  componentWillUnmount() {
    clearTimeout(randomizer);
    clearTimeout(lootResult);
  }

  showRandomizer = () => {
    document.getElementById('loot-slide-container').classList.remove('hide');
  };

  hideRandomizer = () => {
    document.getElementById('loot-slide-container').classList.add('hide');
  };

  showLoot = () => {
    document.getElementById('loot-container').classList.remove('hide');
  };

  render() {
    const { items } = this.state;
    return (
      <div id="lootbox">
        <Modal.Content scrolling>
          <Modal.Description>
            <div id="loot-slide-container" className="hide">
              <Header as="h1" icon textAlign="center">
                <Icon name="bolt" circular />
                <Header.Content>Wait for it </Header.Content>
              </Header>
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
                              item.Type === 'BOMB' ? 'bomb-x1.svg' : ''
                              || item.Type === 'KEY' ? 'key-x1.svg' : ''
                              || item.Type === 'LIFE' ? 'life-x1.svg' : ''
                              || item.Type === 'MULTIPLY_BY_TEN' ? 'multiplier-x10.svg' : ''
                              || item.Type === 'LOOT_BOXE' ? 'lootbox.svg' : ''}`
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
                              item.Type === 'BOMB' ? 'bomb-x1.svg' : ''
                              || item.Type === 'KEY' ? 'key-x1.svg' : ''
                              || item.Type === 'LIFE' ? 'life-x1.svg' : ''
                              || item.Type === 'MULTIPLY_BY_TEN' ? 'multiplier-x10.svg' : ''
                              || item.Type === 'LOOT_BOXE' ? 'lootbox.svg' : ''}`
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
            </div>
            <div id="loot-container" className="hide">
              <Header as="h1" icon textAlign="center">
                <Icon name="dropbox" circular />
                <Header.Content>There it is ! *mangasme*</Header.Content>
              </Header>
              <div>
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
                            item.Type === 'BOMB' ? 'bomb-x1.svg' : ''
                            || item.Type === 'KEY' ? 'key-x1.svg' : ''
                            || item.Type === 'LIFE' ? 'life-x1.svg' : ''
                            || item.Type === 'MULTIPLY_BY_TEN' ? 'multiplier-x10.svg' : ''
                            || item.Type === 'LOOT_BOXE' ? 'lootbox.svg' : ''}`
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
          </Modal.Description>
        </Modal.Content>

      </div>
    );
  }
}

export default LootBox;
