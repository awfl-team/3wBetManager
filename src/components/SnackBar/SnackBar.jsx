import React from 'react';

class SnackBar extends React.Component {
  render() {
    const { message, type } = this.props;
    return (
      <div>
        {message !== ''
      && (
      <div className="snackbar show" id="messageContainer">
        {message}
      </div>
      )}
      </div>
    );
  }
}
export default SnackBar;
