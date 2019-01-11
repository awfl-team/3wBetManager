import React from 'react';
import {Container, Dimmer, Grid, Image, Label, Message, Segment} from 'semantic-ui-react';

class BetRow extends React.Component {
  state = {}
  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { active } = this.state
    return (
        <div id="betRows">
          <Container fluid>
            <div className="betRow" onMouseEnter={() => {}} >
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
                  <div className="container-versus-details">
                    <div className="home-score ">2</div>
                    <div className="versus-text"> - </div>
                    <div className="away-score loose">1</div>
                  </div>
                  <div className="container-versus-details-results">
                    <div className="home-score">2</div>
                    <div className="versus-text"> - </div>
                    <div className="away-score">1</div>
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
              <Message success className="betRow-results">
                <Message.Header>
                  15 pts
                </Message.Header>
                <div className="container-versus-details">
                  <div className="container-versus-details-results-bet">
                    <Label color='green'>
                      Perfect bet
                    </Label>
                  </div>
                </div>
              </Message>
              <div className="betRow-mask">
                <p>Match infos</p>
              </div>
            </div>
            <div className="betRow">
              <div className="betRow-info">
                <div className="container-hometeam">
                  <div className="team-image">
                    <Image src='https://via.placeholder.com/150' className="loose"/>
                  </div>
                  <div className="team-info">
                    <div className="team-name">HomeTeam
                    </div>
                  </div>
                </div>
                <div className="container-versus">
                  <div className="container-versus-details">
                    <div className="home-score ">4</div>
                    <div className="versus-text"> - </div>
                    <div className="away-score">1</div>
                  </div>
                  <div className="container-versus-details-results">
                    <div className="home-score">1</div>
                    <div className="versus-text"> - </div>
                    <div className="away-score">2</div>
                  </div>
                </div>
                <div className="container-awayteam">
                  <div className="team-image">
                    <Image src='https://via.placeholder.com/150' className="win" />
                  </div>
                  <div className="team-info">
                    <div className="team-name">AwayTeam</div>
                  </div>
                </div>
              </div>
              <Message error className="betRow-results">
                <Message.Header>
                  0 pts
                </Message.Header>
                <div className="container-versus-details">
                  <div className="container-versus-details-results-bet">
                    <Label color='red'>
                      Wrong bet
                    </Label>
                  </div>
                </div>
              </Message>
              <div className="betRow-mask">
                <p>Match infos</p>
              </div>
            </div>
          </Container>
        </div>
    );
  }
}

export default BetRow;
