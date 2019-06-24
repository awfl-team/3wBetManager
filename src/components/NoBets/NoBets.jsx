import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NoBets extends React.Component {
  render() {
    return (
      <div className="no-bets-container">
        <div className="no-bets-container-content">
          <img alt="icon" src="assets/images/thinking.svg" />
          <h1>Your result history is empty.</h1>
          <Link to="/bet/submitBets" className="button ui icon">
            Submit bets now !
            <Icon name="arrow right" />
          </Link>
        </div>
      </div>
    );
  }
}

export default NoBets;
