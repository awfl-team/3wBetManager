import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import UserLayout from './components/UserLayout/UserLayout';
import UserService from './service/UserService';
import AuthService from './service/AuthService';

class App extends React.Component {
  state = {
    toLogin: false,
  };

  componentDidMount() {
    if (AuthService.getToken() !== null) {
      UserService.validateToken()
        .then(() => {
          console.log('valid token');
        })
        .catch(() => {
          console.log('invalid token');
          // this.setState({ toLogin: true });
        });
    }
  }

  render() {
    const { toLogin } = this.state;
    if (toLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route component={UserLayout} />
        </Switch>
      </Router>
    );
  }
}

export default App;
