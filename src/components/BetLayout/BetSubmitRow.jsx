import React from 'react';
import {Button, Container, Image, Input, Label, Message} from 'semantic-ui-react';

class BetSubmitRow extends React.Component {
  state = {}
  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { active } = this.state
    return (
        <div id="betRowsResults">
          <Container fluid>
            <div className="betRow">
              <div className="betRow-info">
                <div className="container-hometeam">
                  <div className="team-image">
                    <Image src='https://via.placeholder.com/150' className="win"/>
                  </div>
                  <div className="team-info">
                    <div className="team-name">HomeTeam
                    </div>
                  </div>
                </div>
                <div className="container-versus">
                  <div className="match-info">Match's date</div>
                  <div className="container-versus-details">
                    <div className="home-score "><Input fluid type="number" max="9" min="0" /></div>
                    <div className="versus-text"> - </div>
                    <div className="away-score loose"><Input fluid type="number" max="9" min="0" /></div>
                  </div>
                </div>
                <div className="container-awayteam">
                  <div className="team-image">
                    <Image src='https://via.placeholder.com/150' className="loose" />
                  </div>
                  <div className="team-info">
                    <div className="team-name">AwayTeam</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="betRow">
              <div className="betRow-info">
                <div className="container-hometeam">
                  <div className="team-image">
                    <Image src='https://via.placeholder.com/150' className="win"/>
                  </div>
                  <div className="team-info">
                    <div className="team-name">HomeTeam
                    </div>
                  </div>
                </div>
                <div className="container-versus">
                  <div className="match-info">Match's date</div>
                  <div className="container-versus-details">
                    <div className="home-score "><Input fluid type="number" max="9" min="0" /></div>
                    <div className="versus-text"> - </div>
                    <div className="away-score loose"><Input fluid type="number" max="9" min="0" /></div>
                  </div>
                </div>
                <div className="container-awayteam">
                  <div className="team-image">
                    <Image src='https://via.placeholder.com/150' className="loose" />
                  </div>
                  <div className="team-info">
                    <div className="team-name">AwayTeam</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="betRow">
              <div className="betRow-info">
                <div className="container-hometeam">
                  <div className="team-image">
                    <Image src='https://via.placeholder.com/150' className="win"/>
                  </div>
                  <div className="team-info">
                    <div className="team-name">HomeTeam
                    </div>
                  </div>
                </div>
                <div className="container-versus">
                  <div className="match-info">Match's date</div>
                  <div className="container-versus-details">
                    <div className="home-score "><Input fluid type="number" max="9" min="0" /></div>
                    <div className="versus-text"> - </div>
                    <div className="away-score loose"><Input fluid type="number" max="9" min="0" /></div>
                  </div>
                </div>
                <div className="container-awayteam">
                  <div className="team-image">
                    <Image src='https://via.placeholder.com/150' className="loose" />
                  </div>
                  <div className="team-info">
                    <div className="team-name">AwayTeam</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="betRow">
              <div className="betRow-info">
                <div className="container-hometeam">
                  <div className="team-image">
                    <Image src='https://via.placeholder.com/150' className="win"/>
                  </div>
                  <div className="team-info">
                    <div className="team-name">HomeTeam
                    </div>
                  </div>
                </div>
                <div className="container-versus">
                  <div className="match-info">Match's date</div>
                  <div className="container-versus-details">
                    <div className="home-score "><Input fluid type="number" max="9" min="0" /></div>
                    <div className="versus-text"> - </div>
                    <div className="away-score loose"><Input fluid type="number" max="9" min="0" /></div>
                  </div>
                </div>
                <div className="container-awayteam">
                  <div className="team-image">
                    <Image src='https://via.placeholder.com/150' className="loose" />
                  </div>
                  <div className="team-info">
                    <div className="team-name">AwayTeam</div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

        </div>
    );
  }
}

export default BetSubmitRow;
