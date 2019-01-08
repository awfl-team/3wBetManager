import React from 'react';
import {Container, Grid, Image, Segment} from 'semantic-ui-react';

class BetRow extends React.Component {
  render() {
    return (
        <div id="betRows">
          <Container fluid>
            <div className="betRow">
              <div className="container-hometeam">
                <div className="team-image">
                  <Image src='https://via.placeholder.com/150' />
                </div>
                <div className="team-info">
                  <div className="team-name">HomeTeam </div>
                </div>
              </div>
              <div className="container-versus-details">
                <div className="home-score">1</div>
                <div className="versus-text">VS</div>
                <div className="away-score">2</div>
              </div>
              <div className="container-awayteam">
                <div className="team-info">
                  <div className="team-name">AwayTeam</div>
                </div>
                <div className="team-image">
                  <Image src='https://via.placeholder.com/150' />
                </div>
              </div>
            </div>
            <div className="betRow">
              <div className="container-hometeam">
                <div className="team-image">
                  <Image src='https://via.placeholder.com/150' />
                </div>
                <div className="team-info">
                  <div className="team-name">HomeTeam </div>
                </div>
              </div>
              <div className="container-versus-details">
                <div className="home-score">1</div>
                <div className="versus-text">VS</div>
                <div className="away-score">2</div>
              </div>
              <div className="container-awayteam">
                <div className="team-info">
                  <div className="team-name">AwayTeam</div>
                </div>
                <div className="team-image">
                  <Image src='https://via.placeholder.com/150' />
                </div>
              </div>
            </div>
          </Container>
        </div>
    );
  }
}

export default BetRow;
