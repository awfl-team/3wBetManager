import React from 'react';
import AuthService from '../../service/AuthService';

class NotFound extends React.Component {
  state = {
    token: '',
  };

  componentDidMount() {
    const token = AuthService.getToken();
    this.setState({ token });
  }

  handleClick(value: string) {
    if (value === 'dashboard') {
      // @ts-ignore
      // @todo - Find a solution
      this.props.history.push(`/${value}`);
    } else {
      // @ts-ignore
      // @todo - Find a solution
      this.props.history.push('/');
    }
  }

  render() {
    const { token } = this.state;
    return (
      <div className="notFound-page">
        <div className="ui middle aligned center aligned fullpage">
          <div className="column">
            <h2 className="ui teal authentication-header">
              <div className="content">
                <p className="notFound-header">OUPS, 404</p>
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
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
