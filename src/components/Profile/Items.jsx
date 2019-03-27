import React from 'react';
import {
  Button, Container, Grid, Header, Icon, Label,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class Items extends React.Component {
  componentDidMount() {
  }

  render() {
    // https://codepen.io/camr/pen/yjdrLp
    return (
      <div id="lootbox">
        <Container fluid>
          <Grid>
            <Grid.Column floated="left" width={5}>
              <div align="left">
                <Link to="/profile" className="ui green icon left labeled button">
                  My profile
                  <Icon name="left arrow" />
                </Link>
              </div>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <div align="right">
                <Link to="/shop" className="ui green icon right labeled button">
                  Shop
                  <Icon name="right arrow" />
                </Link>
              </div>
            </Grid.Column>

          </Grid>
        </Container>
        <Header as="h2" icon textAlign="center">
          <Icon name="shop" circular />
          <Header.Content>3wItems</Header.Content>
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
                </div>
                <div className="loot-image legendary">
                  <img
                    alt=""
                    src="https://steamuserimages-a.akamaihd.net/ugc/
                       939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/"
                  />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size="large">
                  <Button inverted color="green">
                    <Icon name="bolt" />
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
                </div>
                <div className="loot-image epic">
                  <img
                    alt=""
                    src="https://steamuserimages-a.akamaihd.net/ugc/
                       939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/"
                  />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size="large">
                  <Button inverted color="green">
                    <Icon name="bolt" />
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
                </div>
                <div className="loot-image uncommon">
                  <img
                    alt=""
                    src="https://steamuserimages-a.akamaihd.net/ugc/
                       939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/"
                  />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size="large">
                  <Button inverted color="green">
                    <Icon name="bolt" />
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
                </div>
                <div className="loot-image common">
                  <img
                    alt=""
                    src="https://steamuserimages-a.akamaihd.net/ugc/
                       939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/"
                  />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size="large">
                  <Button inverted color="green">
                    <Icon name="bolt" />
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
                </div>
                <div className="loot-image">
                  <img
                    alt=""
                    src="https://steamuserimages-a.akamaihd.net/ugc/
                       939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/"
                  />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size="large">
                  <Button inverted color="green">
                    <Icon name="bolt" />
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
                </div>
                <div className="loot-image">
                  <img
                    alt=""
                    src="https://steamuserimages-a.akamaihd.net/ugc/
                       939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/"
                  />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size="large">
                  <Button inverted color="green">
                    <Icon name="bolt" />
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
                </div>
                <div className="loot-image legendary">
                  <img
                    alt=""
                    src="https://steamuserimages-a.akamaihd.net/ugc/
                       939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/"
                  />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size="large">
                  <Button inverted color="green">
                    <Icon name="bolt" />
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
                </div>
                <div className="loot-image">
                  <img
                    alt=""
                    src="https://steamuserimages-a.akamaihd.net/ugc/
                       939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/"
                  />
                </div>
                <div className="loot-description">
                  Description
                </div>
              </div>
              <div className="item-card-bottom">
                <Button.Group size="large">
                  <Button inverted color="green">
                    <Icon name="bolt" />
                  </Button>
                </Button.Group>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Items;
