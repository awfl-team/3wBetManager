import React from 'react';
import {
  HashRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import $ from 'jquery';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import UserLayout from './components/UserLayout/UserLayout';
import SnackBar from './components/SnackBar/SnackBar';
import NotFound from './components/404/NotFound';
import ForgotPasswordComponent from './components/ForgotPassword/ForgotPasswordComponent';
import ResetPasswordComponent from './components/ForgotPassword/ResetPasswordComponent';
import AuthService from './service/AuthService';
import NotificationHelper from './service/helpers/NotificationHelper';

window.jQuery = $;
require('signalr');

class App extends React.Component {
  state = {
    toLogin: false,
  };

  componentDidMount() {
    let isConnect = false;
    Notification.requestPermission().then().catch();
    const connection = $.hubConnection(process.env.REACT_APP_API_URL.slice(0, -1));
    connection.qs = { username: AuthService.getUserInfo(AuthService.getToken()).unique_name };
    const notificationHub = connection.createHubProxy('notificationHub');
    notificationHub.on('NotifyUser', (message) => {
      console.log('ntm roman');
      NotificationHelper.createNotif(message);
    });
    if (isConnect !== true) {
      connection.start()
        .done(() => {
          isConnect = true;
        })
        .fail(() => {
          // TODO add snackbar message
          console.log('Could not connect');
        });
    }
  }

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
              path="/(dashboard|profile|update-profile|bestBetters|user/*|bet/myBets|bet/submitBets|admin|items|lootbox|shop|bomb|key|multiplierbyten)"
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
