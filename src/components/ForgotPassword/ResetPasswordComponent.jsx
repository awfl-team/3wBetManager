import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import UserHttpService from '../../httpServices/UserHttpService';
import User from '../../model/User';
import AuthHelper from '../../helpers/AuthHelper';
import { addSnackBar } from '../../actions/SnackBarActions';
import FormClassnameHelper from '../../helpers/FormClassnameHelper';


function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class ResetPasswordComponent extends React.Component {
  state = {
    tokenIsValid: false,
    password: '',
    confirmPassword: '',
    className: {},
  };

  componentDidMount() {
    const {
      password, confirmPassword,
    } = this.state;
    this.setState({
      className: FormClassnameHelper.getClassNamesForPassword(password,
        confirmPassword),
    });
    AuthHelper.setTokenInLocalStorage(this.props.match.params.token);
    UserHttpService.getFromToken().then(() => {
      this.setState({ tokenIsValid: true });
    });
  }

  handleChange = (property, event) => {
    const {
      password, confirmPassword,
    } = this.state;

    const refreshedClassName = FormClassnameHelper.refreshClassNameForPassword(property,
      event.target.value, password, confirmPassword);
    const data = {
      className: refreshedClassName.className,
    };
    data[property] = refreshedClassName[property];
    this.setState(data);
  };

  handleSubmit(event) {
    const { tokenIsValid } = this.state;
    event.preventDefault();
    if (tokenIsValid !== false) {
      const user = new User();
      user.Password = event.target.password.value;
      if (event.target.password.value === event.target.confirmPassword.value) {
        UserHttpService.resetPassword(user).then(() => {
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
    const {
      confirmPassword, password, className,
    } = this.state;

    return (
      <div className="register-page">
        <Button color="red" size="huge" id="returnHome" circular icon onClick={() => this.handleClick()}>
          <Icon name="arrow left" />
        </Button>
        <div className="ui middle aligned center aligned fullpage">
          <div className="column">
            <h2 className="ui teal authentication-header">
              <div className="content">
                  Create new password
              </div>
            </h2>
            <form
              className="ui large form"
              onSubmit={this.handleSubmit.bind(this)}
              autoComplete="off"
            >
              <div className="ui stacked">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={e => this.handleChange('password', e)}
                      className={className.isPasswordOk ? 'okInput' : password.length === 0 ? '' : 'errorInput'}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={e => this.handleChange('confirmPassword', e)}
                      className={className.isPasswordOk ? 'okInput' : confirmPassword.length === 0 ? '' : 'errorInput'}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="ui fluid large teal submit button main-button"
                  disabled={!className.isEnabled}
                >
                    Sign Up
                </button>
                <div className="form-info validation">
                  <p className={className.formFieldIdentical}>
                    <i className="info circle icon" />
                      The password must be identical with the
                      password field
                  </p>
                  <p className={className.formFieldNumber}>
                    <i className="info circle icon" />
                      The password requires at least 12 characters
                  </p>
                  <p className={className.formMultipleInfos}>
                    <i className="info circle icon" />
                      The password requires a
                    <span
                      className={className.formdFieldUppercase}
                    >
                    uppercase
                    </span>
                      , a
                    <span className={className.formFieldSpecial}>
                        special character
                    </span>
                      and
                    <span
                      className={className.formFieldWithNumber}
                    >
                      a number
                    </span>
                  </p>
                </div>
              </div>
              <div className="ui error message" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const resetPasswordComponent = connect(null, mapDispatchToProps)(ResetPasswordComponent);
export default resetPasswordComponent;
