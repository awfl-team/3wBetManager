import React from 'react';
import {
  Button, Container, Header, Icon, Label, Menu,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import ItemService from '../../service/ItemService';
import UserService from '../../service/UserService';


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
        <Header as="h2" icon textAlign="center">
          <Icon name="shop" circular />
          <Header.Content>3wItems</Header.Content>
        </Header>
        <Container textAlign="center" fluid>
          <div id="loot-container" className="shop">
            {items.map(item => (
              <div key={item.Id} className="item-card">
                <Label color="black" floating>
                  {userItems.filter(i => i.Type === item.Type).length}
                </Label>
                <div className="loot">
                  <div className="loot-title">
                    <h3 className="item-name">{item.Name}</h3>
                  </div>
                  <div className="loot-image legendary">
                    <img
                      alt=""
                      src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/"
                    />
                  </div>
                  <div className="loot-description">
                    {item.Description}
                  </div>
                </div>
                <div className="item-card-bottom">
                  <Button.Group size="large">
                    <Button
                      inverted
                      color="green"
                      disabled={userItems.filter(i => i.Type === item.Type).length === 0}
                    >
                      <Icon name="bolt" />
                    </Button>
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
