import React from 'react';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import UserLayout from './components/UserLayout/UserLayout';
import SnackBar from './components/SnackBar/SnackBar';
import NotFound from './components/404/NotFound';

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
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route
              path="/(dashboard|profile|update-profile|bestBetters|user/*|bet/myBets|bet/submitBets|admin)"
              component={UserLayout}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <SnackBar />
      </div>
    );
  }
}

export default App;
