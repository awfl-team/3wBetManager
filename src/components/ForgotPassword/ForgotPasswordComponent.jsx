import React from 'react';

class ForgotPasswordComponent extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="login-page">
        <div className="ui middle aligned center aligned fullpage">
          <div className="column">
            <h2 className="ui teal authentication-header">
              <div className="content">
                  Forgot Password
              </div>
            </h2>
            <form className="ui large form" onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
              <div className="ui stacked">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="ui fluid large teal submit button main-button"
                >
                    Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordComponent;
