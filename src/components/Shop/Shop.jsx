import React from 'react';
import {Button, Container, Grid, Header, Icon, Image, Label, List} from "semantic-ui-react";
import {Link} from "react-router-dom";


class Shop extends React.Component {
  componentDidMount() {
  }

  render() {
    // https://codepen.io/camr/pen/yjdrLp
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
            <div className="item-card">
              <Label color="black" floating>
                1/5
              </Label>
              <div className="loot">
                <div className="loot-title">
                  <h3 className="item-name">Name</h3>
                  <Icon color="yellow" name="copyright" size="big" />
                  <span>500</span>
                </div>
                <div className="loot-image legendary">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size='large'>
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
            <div className="item-card">
              <Label color="black" floating>
                1/5
              </Label>
              <div className="loot">
                <div className="loot-title">
                  <h3 className="item-name">Name</h3>
                  <Icon color="yellow" name="copyright" size="big" />
                  <span>500</span>
                </div>
                <div className="loot-image epic">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size='large'>
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
            <div className="item-card">
              <Label color="black" floating>
                1/5
              </Label>
              <div className="loot">
                <div className="loot-title">
                  <h3 className="item-name">Name</h3>
                  <Icon color="yellow" name="copyright" size="big" />
                  <span>500</span>
                </div>
                <div className="loot-image uncommon">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size='large'>
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
            <div className="item-card">
              <Label color="black" floating>
                1/5
              </Label>
              <div className="loot">
                <div className="loot-title">
                  <h3 className="item-name">Name</h3>
                  <Icon color="yellow" name="copyright" size="big" />
                  <span>500</span>
                </div>
                <div className="loot-image common">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size='large'>
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
            <div className="item-card">
              <Label color="black" floating>
                1/5
              </Label>
              <div className="loot">
                <div className="loot-title">
                  <h3 className="item-name">Name</h3>
                  <Icon color="yellow" name="copyright" size="big" />
                  <span>500</span>
                </div>
                <div className="loot-image">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size='large'>
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
            <div className="item-card">
              <Label color="black" floating>
                1/5
              </Label>
              <div className="loot">
                <div className="loot-title">
                  <h3 className="item-name">Name</h3>
                  <Icon color="yellow" name="copyright" size="big" />
                  <span>500</span>
                </div>
                <div className="loot-image">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size='large'>
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
            <div className="item-card">
              <Label color="black" floating>
                1/5
              </Label>
              <div className="loot">
                <div className="loot-title">
                  <h3 className="item-name">Name</h3>
                  <Icon color="yellow" name="copyright" size="big" />
                  <span>500</span>
                </div>
                <div className="loot-image legendary">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size='large'>
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
            <div className="item-card">
              <Label color="black" floating>
                1/5
              </Label>
              <div className="loot">
                <div className="loot-title">
                  <h3 className="item-name">Name</h3>
                  <Icon color="yellow" name="copyright" size="big" />
                  <span>500</span>
                </div>
                <div className="loot-image">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size='large'>
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
          </div>
        </Container>
        <div className="ui fluid container submit-bets-action">
          <button
            type="submit"
            className="ui green button submit-bets-action-button"
            role="button"
            tabIndex="-1">Buy</button>
        </div>
      </div>
    );
  }
}

export default Shop;
