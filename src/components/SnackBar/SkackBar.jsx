import React from 'react';

class SkackBar extends React.Component {
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
export default SkackBar;
