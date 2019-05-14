import react from 'react';
import {
  HashRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import NotFound from './components/404/NotFound';
import ForgotPasswordComponent from './components/ForgotPassword/ForgotPasswordComponent';
import ResetPasswordComponent from './components/ForgotPassword/ResetPasswordComponent';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import SnackBar from './components/SnackBar/SnackBar';
import UserLayout from './components/UserLayout/UserLayout';
import VerifyAccountComponent from './components/VerifyAccount/VerifyAccountComponent';

class App extends React.Component {
  public state = {
    toLogin: false,
  };

  public render() {
    const { toLogin } = this.state;
    if (toLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/" exact={true} component={Homepage} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/forgot_password" exact={true} component={ForgotPasswordComponent} />
            <Route path="/signup" exact={true} component={SignUp} />
            <Route path="/reset_password/:token" exact={true} component={ResetPasswordComponent} />
            <Route path="/verify_account/:token" exact={true} component={VerifyAccountComponent} />
            <Route
              exact={true}
              sensitive={true}
              strict={true}
              path="/(dashboard|profile|update-profile|bestBetters|bypass|bet/myBets|bet/submitBets|items|lootbox|shop|bomb|key|multiplier|mystery|admin/users|admin/items|admin/tasks)"
              component={UserLayout}
            />
            <Route
              sensitive={true}
              strict={true}
              path="/(user/*)"
              component={UserLayout}
            />
            <Route component={NotFound} />
          </Switch>
        </HashRouter>
        <SnackBar />
      </div>
    );
  }
}

export default App;
