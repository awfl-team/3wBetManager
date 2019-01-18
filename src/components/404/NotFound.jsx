import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div className="notFound-page">
        <div className="ui middle aligned center aligned fullpage">
          <div className="column">
            <h2 className="ui teal authentication-header">
              <div className="content">
                  <p className="notFound-header">OUPS, 404</p>
                  <p>Click here to go back in time !</p>
              </div>
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
