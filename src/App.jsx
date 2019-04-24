import React from 'react';
import {
  HashRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import UserLayout from './components/UserLayout/UserLayout';
import SnackBar from './components/SnackBar/SnackBar';
import NotFound from './components/404/NotFound';
import ForgotPasswordComponent from './components/ForgotPassword/ForgotPasswordComponent';
import ResetPasswordComponent from './components/ForgotPassword/ResetPasswordComponent';

class App extends React.Component {
  state = {
    toLogin: false,
  };

  render() {
    const { toLogin } = this.state;
    if (toLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/login" exact component={Login} />
            <Route path="/forgot_password" exact component={ForgotPasswordComponent} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/reset_password/:token" exact component={ResetPasswordComponent} />
            <Route
              path="/(dashboard|profile|update-profile|bestBetters|user/*|bet/myBets|bet/submitBets|admin|items|lootbox|shop|bomb|key|multiplier|mystery)"
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
