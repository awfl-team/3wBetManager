import React from 'react';
import connect from 'react-redux/es/connect/connect';
import UserService from '../../service/UserService';
import User from '../../model/User';
import { addSnackBar } from '../../actions/SnackBarActions';

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class ForgotPasswordComponent extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const user = new User();
    user.Email = event.target.email.value;
    UserService.forgotPassword(user)
      .then(() => {
        this.props.addSnackbar({
          message: `Email sent to ${user.Email}'`,
          type: 'success',
        });
      });
  }

  render() {
    return (
      <div className="login-page">
        <div className="ui middle aligned center aligned fullpage">
          <div className="column">
            <h2 className="ui teal authentication-header">
              <div className="content">
                  Reset your Password
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
const forgotPasswordComponent = connect(null, mapDispatchToProps)(ForgotPasswordComponent);
export default forgotPasswordComponent;
