import React from 'react';


class NotFound extends React.Component {
  handleClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="notFound-page">
        <div className="ui middle aligned center aligned fullpage">
          <div className="column">
            <h2 className="ui teal authentication-header">
              <div className="content">
                  <p className="notFound-header">OUPS, 404</p>
                  <button onClick={this.handleClick} className="back-button">Go back</button>
              </div>
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
