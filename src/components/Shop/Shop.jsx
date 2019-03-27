import React from 'react';
import {
  Button, Container, Grid, Header, Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ItemService from '../../service/ItemService';


class Shop extends React.Component {
  state = {
    items: [],
  };

  componentDidMount() {
    ItemService.getAllItems().then((res) => {
      this.setState({ items: res.data });
    });
  }

  render() {
    // https://codepen.io/camr/pen/yjdrLp
    const { items } = this.state;
    return (
      <div id="lootbox">
        <Container fluid>
          <Grid>
            <Grid.Column floated="right" width={5}>
              <div align="right">
                <Link to="/items" className="ui green icon right labeled button">
                  My items
                  <Icon name="right arrow" />
                </Link>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
        <Header as="h2" icon textAlign="center">
          <Icon name="shop" circular />
          <Header.Content>3wShop</Header.Content>
        </Header>
        <Container textAlign="center" fluid>
          <div id="loot-container" className="shop">
            {items.map(item => (
              <div key={item.Id} className="item-card">
                <div className="loot">
                  <div className="loot-title">
                    <h3 className="item-name">{item.Name}</h3>
                    <Icon color="yellow" name="copyright" size="big" />
                    <span>{item.Cost}</span>
                  </div>
                  <div className="loot-image legendary">
                    <img
                      alt=""
                      src="https://steamuserimages-a.akamaihd.net/ugc/
                       939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/"
                    />
                  </div>
                  <div className="loot-description">
                    {item.Description}
                  </div>
                </div>
                <div className="item-card-bottom">
                  <Button.Group size="large">
                    <Button inverted color="red">
                      <Icon name="minus" />
                    </Button>
                    <Button.Or text="1" />
                    <Button inverted color="green">
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
            type="submit"
            className="ui green button submit-bets-action-button"
            tabIndex="-1"
          >
        Buy
          </button>
        </div>
      </div>
    );
  }
}

export default Shop;
