import React from 'react';
import AuthHelper from '../../helpers/AuthHelper';


class NotFound extends React.Component {
  state = {
    token: '',
  };

  componentDidMount() {
    const token = AuthHelper.getToken();
    this.setState({ token });
  }

  handleClick(value) {
    if (value === 'dashboard') {
      this.props.history.push(`/${value}`);
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    const { token } = this.state;
    return (
      <div className="notFound-page">
        <div className="ui middle aligned center aligned fullpage">
          <div className="column">
            <div className="content notFound-content">
              <p className="notFound-header">404</p>
              <p className="notFound-header-small">It seems you got lost ...</p>
              {token === null
              && (
                <button
                  type="button"
                  onClick={() => this.handleClick('home')}
                  className="back-button"
                >
                  Go to homepage
                </button>
              )
              }
              {token !== null
              && (
                <button
                  type="button"
                  onClick={() => this.handleClick('dashboard')}
                  className="back-button"
                >
                  Go to dashboard
                </button>
              )
              }
            </div>
            <img alt="lost" src="assets/gif/lost.gif" className="lost" />
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
