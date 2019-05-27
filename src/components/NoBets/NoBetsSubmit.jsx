import React from 'react';

class NoBetsSubmit extends React.Component {
  render() {
    return (
      <div className="no-bets-container">
        <div className="no-bets-container-content">
          <img alt="icon" src="assets/images/thinking.svg" />
          <h1>There is no match available right now</h1>
          <p>Please come visit us later</p>
        </div>
      </div>
    );
  }
}

export default NoBetsSubmit;
