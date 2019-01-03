import React from 'react';

class Error extends React.Component {
  render() {
    const { errorMessage } = this.props;
    return (
      <div>
        {errorMessage !== ''
      && (
      <div className="errorMessage show" id="messageContainer">
        {errorMessage}
      </div>
      )}
      </div>
    );
  }
}
export default Error;
