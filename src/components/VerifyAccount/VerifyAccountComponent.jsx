import React from 'react';
import connect from 'react-redux/es/connect/connect';
import UserService from '../../services/UserService';
import User from '../../model/User';
import { addSnackBar } from '../../actions/SnackBarActions';
import AuthHelper from '../../helpers/AuthHelper';

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class VerifyAccountComponent extends React.Component {
  state = {
    tokenIsValid: false,
  };

  componentDidMount() {
    AuthHelper.setTokenInLocalStorage(this.props.match.params.token);
    UserService.getFromToken().then((res) => {
      this.setState({ tokenIsValid: true });
      if (this.state.tokenIsValid === true) {
        UserService.verifyAccount(res.data).then(() => {
          this.props.addSnackbar({
            message: 'Your email address is confirm',
            type: 'success',
          });
        });
      } else {
        this.props.addSnackbar({
          message: 'Invalid token',
          type: 'danger',
        });
      }
    });
  }

  handleSubmit(event) {
    const { tokenIsValid } = this.state;
    event.preventDefault();
    if (tokenIsValid !== false) {
      const user = new User();
      user.Password = event.target.password.value;
      if (event.target.password.value === event.target.confirmPassword.value) {
        UserService.resetPassword(user).then(() => {
          this.props.addSnackbar({
            message: 'Password Reset',
            type: 'success',
          });
        });
      }
    } else {
      this.props.addSnackbar({
        message: 'Invalid token',
        type: 'danger',
      });
    }
  }

  render() {
    return (
      <div className="register-page">
        <div className="ui middle aligned center aligned fullpage">
          <div className="column">
            <h2 className="ui teal authentication-header">
              <div className="content">
                  Confirm Email
              </div>
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

const verifyAccountComponent = connect(null, mapDispatchToProps)(VerifyAccountComponent);
export default verifyAccountComponent;
