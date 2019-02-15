import React from 'react';
import {Container, Divider, Header, Icon} from "semantic-ui-react";

let expanded = true


class LootBox extends React.Component {
  componentDidMount() {
    document.getElementById('loot-slide').style.width = document.getElementById('slide-comp-1').offsetWidth;
    setInterval(() => {
      if (expanded) {
        expanded = false;
        // document.querySelector(".alert").classList.add("hide");
        // document.querySelector(".alert").classList.add("hide");
      } else {
        expanded = true;
        document.querySelector(".loot").classList.remove("hide");
      }
    }, 10000);
  }

  handleSlideClick = () => {
    document.getElementById('loot-slide').classList.remove("hide");
  }

  handleLootClick = () => {
    document.getElementById('loot-slide').classList.add("hide");
    document.getElementById('loot-container').classList.remove("hide");
  }

  render() {
    // https://codepen.io/camr/pen/yjdrLp
    return (
      <div id="lootbox">

        <Header as="h2" icon textAlign="center">
          <Icon name="box" circular />
          <Header.Content>Test</Header.Content>
        </Header>
        <Container textAlign="center" fluid>
          <button href="#" onClick={this.handleSlideClick}>Trigger slide</button>
          <button href="#" onClick={this.handleLootClick}>Trigger loot</button>

          <div id="loot-slide" className="hide">
            <div id="slide-comp-1">
            <div className="loot">
              <div className="loot-image legendary">
                <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
              </div>
            </div>
            <div className="loot">
              <div className="loot-image insane">
                <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
              </div>
            </div>
            <div className="loot">
              <div className="loot-image common">
                <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
              </div>
            </div>
            <div className="loot">
              <div className="loot-image uncommon">
                <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
              </div>
            </div>
          </div>
            <div id="slide-comp-2">
              <div className="loot">
                <div className="loot-image legendary">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
                </div>
              </div>
              <div className="loot">
                <div className="loot-image insane">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
                </div>
              </div>
              <div className="loot">
                <div className="loot-image common">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
                </div>
              </div>
              <div className="loot">
                <div className="loot-image uncommon">
                  <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
                </div>
              </div>
            </div>
          </div>
          <div id="loot-container" className="hide">
            <div className="loot">
              <div className="loot-title">
                <h3 className="item-name">SoAndSo</h3>
                <span>Received</span>
              </div>

              <div className="loot-image">
                <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
              </div>

              <div className="loot-description">
                <span className="channel-name">Shroud's</span> Custom Gun
              </div>
            </div>
            <div className="loot">
              <div className="loot-title">
                <h3 className="item-name">SoAndSo</h3>
                <span>Received</span>
              </div>

              <div className="loot-image">
                <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
              </div>

              <div className="loot-description">
                <span className="channel-name">Shroud's</span> Custom Gun
              </div>
            </div>
            <div className="loot">
              <div className="loot-title">
                <h3 className="item-name">SoAndSo</h3>
                <span>Received</span>
              </div>

              <div className="loot-image">
                <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
              </div>

              <div className="loot-description">
                <span className="channel-name">Shroud's</span> Custom Gun
              </div>
            </div>
            <div className="loot">
              <div className="loot-title">
                <h3 className="item-name">SoAndSo</h3>
                <span>Received</span>
              </div>

              <div className="loot-image">
                <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
              </div>

              <div className="loot-description">
                <span className="channel-name">Shroud's</span> Custom Gun
              </div>
            </div>
            <div className="loot">
              <div className="loot-title">
                <h3 className="item-name">SoAndSo</h3>
                <span>Received</span>
              </div>

              <div className="loot-image">
                <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
              </div>

              <div className="loot-description">
                <span className="channel-name">Shroud's</span> Custom Gun
              </div>
            </div>
            <div className="loot">
            <div className="loot-title">
              <h3 className="item-name">SoAndSo</h3>
              <span>Received</span>
            </div>

            <div className="loot-image">
              <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
            </div>

            <div className="loot-description">
              <span className="channel-name">Shroud's</span> Custom Gun
            </div>
          </div>
            <div className="loot">
            <div className="loot-title">
              <h3 className="item-name">SoAndSo</h3>
              <span>Received</span>
            </div>

            <div className="loot-image">
              <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
            </div>

            <div className="loot-description">
              <span className="channel-name">Shroud's</span> Custom Gun
            </div>
          </div>
            <div className="loot">
            <div className="loot-title">
              <h3 className="item-name">SoAndSo</h3>
              <span>Received</span>
            </div>

            <div className="loot-image">
              <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
            </div>

            <div className="loot-description">
              <span className="channel-name">Shroud's</span> Custom Gun
            </div>
          </div>
            <div className="loot">
            <div className="loot-title">
              <h3 className="item-name">SoAndSo</h3>
              <span>Received</span>
            </div>

            <div className="loot-image">
              <img src="https://steamuserimages-a.akamaihd.net/ugc/939437582927019730/096E1FF572F90D9EA3D893F05CE4C0BCFAA4C3CC/" />
            </div>

            <div className="loot-description">
              <span className="channel-name">Shroud's</span> Custom Gun
            </div>
          </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default LootBox;
