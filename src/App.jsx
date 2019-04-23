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
    Notification.requestPermission().then().catch();
    const connection = $.hubConnection(process.env.REACT_APP_API_URL.slice(0, -1));
    connection.qs = { username: AuthService.getUserInfo(AuthService.getToken()).unique_name };
    setTimeout(() => {
      const notificationHub = connection.createHubProxy('notificationHub');
      console.log('test');
      notificationHub.on('NotifyUser', (message) => {
        console.log('ok');
        NotificationHelper.createNotif(message);
      });
    }, 500);
    connection.received((data) => {
      console.log('ntm c#');
      console.log(data);
    });
    connection.logging = true;
    connection.error((error) => {
      console.log(`SignalR error: ${error}`);
    });
    connection.start()
      .done(() => {
        console.log('nique bien ta mère roman');
      })
      .fail((err) => {
        console.log(err);
      });
    connection.connectionSlow(() => {
      console.log('connectionSlow');
    });
    connection.starting(() => {
      console.log('starting');
    });
    connection.received(() => {
      console.log('received');
    });
    connection.reconnecting(() => {
      console.log('reconnecting');
    });
    connection.disconnected(() => {
      console.log('disconnected');
    });
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
