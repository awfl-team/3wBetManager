import React from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import {
  Container, Icon, Menu, Segment, Sidebar,
} from 'semantic-ui-react';
import { hubConnection } from 'signalr-no-jquery';
import Dashboard from '../Dashboard/Dashboard';
import AuthService from '../../service/AuthService';
import Profile from '../Profile/Profile';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import withAuth from '../AuthGuard/AuthGuard';
import BestBettersLayout from '../BestBetters/BestBettersLayout';
import ConsultProfile from '../Profile/ConsultProfile';
import BetLayout from '../BetLayout/BetLayout';
import PageScroller from '../PageScroller/PageScroller';
import AdminLayout from '../AdminLayout/AdminLayout';
import Help from '../Help/Help';
import LootBox from '../Items/LootBox';
import Shop from '../Shop/Shop';
import Items from '../Profile/Items';
import Bomb from '../Items/Bomb';
import Key from '../Items/Key';
import Multiplier from '../Items/Multiplier';
import Mystery from '../Items/Mystery';
import NotificationHelper from '../../service/helpers/NotificationHelper';


class UserLayout extends React.Component {
  state = {
    visible: true,
    toHome: false,
  };

  componentDidMount() {
    Notification.requestPermission().then().catch();
    const connection = hubConnection(process.env.REACT_APP_API_URL.slice(0, -1));
    connection.qs = { username: AuthService.getUserInfo(AuthService.getToken()).unique_name };
    const notificationHub = connection.createHubProxy('notificationHub');
    notificationHub.on('NotifyUser', (message) => {
      NotificationHelper.createNotif(message);
    });
    connection.start({ jsonp: true })
      .done(() => {
        console.log('start');
      })
      .fail((err) => {
        console.log(err);
      });
  }

  handleToggleSidenav = () => this.setState(previousState => ({ visible: !previousState.visible }));

  logout() {
    AuthService.logout();
    this.props.history.push('/login');
    this.setState({ toHome: true });
  }

  render() {
    const {
      visible, toHome,
    } = this.state;

    if (toHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className="layout">
        <Menu inverted className="primary-bg">
          <Menu.Item as="a" className="menu-hamburger" onClick={() => this.handleToggleSidenav()}><Icon name="sidebar" /></Menu.Item>
          <Container className="navbar">
            <Help />
            <Menu.Item as={NavLink} to="/profile" className={this.props.history.location.pathname === '/update-profile' ? 'active' : ''}>
              My profile
            </Menu.Item>
            <Menu.Item as="a" onClick={() => this.logout()}>
              Logout
            </Menu.Item>
          </Container>
        </Menu>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="push" visible={visible} icon="labeled" inverted vertical width="thin" className="primary-bg">
            <Menu.Item as={NavLink} activeClassName="active" to="/dashboard">
              <Icon name="dashboard" />
              Dashboard
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              activeClassName="active"
              className={this.props.history.location.pathname === '/bet/submitBets' ? 'active' : ''}
              to="/bet/myBets"
            >
              <Icon name="ticket" />
              My Bets
            </Menu.Item>
            <Menu.Item as={NavLink} activeClassName="active" to="/bestBetters">
              <Icon name="fire" />
              Top 50
            </Menu.Item>
            { this.props.user.role === 'ADMIN'
              && (
              <Menu.Item
                as={NavLink}
                activeClassName="active"
                className={this.props.history.location.pathname === '/admin/tasks'
                || this.props.history.location.pathname === '/admin/items'
                || this.props.history.location.pathname === '/admin/addUser' ? 'active' : ''}
                to="/admin/users"
              >
                <Icon name="angular" />
                    Admin
              </Menu.Item>
              )
            }
            <Menu.Item
              as={NavLink}
              activeClassName="active"
              to="/shop"
              className={this.props.history.location.pathname === '/items' ? 'active' : ''}
            >
              <Icon name="shop" />
              3wShop
            </Menu.Item>
          </Sidebar>
          <div />
          <Sidebar.Pusher className={!visible ? 'full-width' : ''}>
            <Segment basic className="content-container">
              <div id="scroll-anchor" />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/profile" component={Profile} />
              <Route path="/items" component={Items} />
              <Route path="/update-profile" component={UpdateProfile} />
              <Route path="/bestBetters" component={BestBettersLayout} />
              <Route path="/user/:userId" component={ConsultProfile} />
              <Route path="/bet" component={BetLayout} />
              <Route path="/shop" component={Shop} />
              <Route path="/admin" component={AdminLayout} />
              <Route path="/lootbox" component={LootBox} />
              <Route path="/bomb" component={Bomb} />
              <Route path="/mystery" component={Mystery} />
              <Route path="/key" component={Key} />
              <Route path="/multiplier" component={Multiplier} />
              <PageScroller />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default withAuth(UserLayout);
