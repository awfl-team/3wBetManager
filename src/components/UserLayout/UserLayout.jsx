import React from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import {
  Container, Icon, Menu, Segment, Sidebar,
} from 'semantic-ui-react';
import { hubConnection } from 'signalr-no-jquery';
import Hammer from 'hammerjs';
import Dashboard from '../Dashboard/Dashboard';
import AuthHelper from '../../helpers/AuthHelper';
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
import NotificationHelper from '../../helpers/NotificationHelper';
import ConsultProfileWithKey from '../Profile/ConsultProfileWithKey';

let gestureHandler;
let resizeHandlerEvent;

class UserLayout extends React.Component {
  state = {
    visible: window.innerWidth > 800,
    toHome: false,
  };

  componentDidMount() {
    this.handleSwipe();
    this.handleResize();
    try {
      if (Notification.permission === 'granted') {
        this.establishNotificationConnection();
      } else {
        Notification.requestPermission().then(() => {
          this.establishNotificationConnection();
        });
      }
    } catch (error) {
      if (error instanceof TypeError) {
        Notification.requestPermission(() => {
          this.establishNotificationConnection();
        });
      } else {
        console.log('Notification are not available on your browser');
      }
    }
  }

  handleResize = () => {
    resizeHandlerEvent = window.addEventListener('resize', () => {
      if (window.innerWidth > 800) {
        this.setState({ visible: true });
      } else {
        this.setState({ visible: false });
      }
    });
  }

  handleSwipe = () => {
    gestureHandler = new Hammer(document.getElementById('root'));
    gestureHandler.get('pan').set({ threshold: 100 });
    gestureHandler.on('panleft panright', (event) => {
      if (event.target.closest('table') === null) {
        switch (event.direction) {
          case Hammer.DIRECTION_LEFT:
          /* Swipe to left */
            this.setState({ visible: false });
            break;
          case Hammer.DIRECTION_RIGHT:
          /* Swipe to right */
            this.setState({ visible: true });
            break;
          default:
            this.setState({ visible: false });
            break;
        }
      }
    });
  }

  handleToggleSidenav = () => this.setState(previousState => ({ visible: !previousState.visible }));

  handleSidenavBehaviorOnWindowSize = () => {
    if (window.innerWidth < 800) {
      this.setState(previousState => ({ visible: !previousState.visible }));
    }
  }

  establishNotificationConnection() {
    const connection = hubConnection(process.env.REACT_APP_API_URL.slice(0, -1));
    connection.qs = { username: AuthHelper.getUserInfo(AuthHelper.getToken()).unique_name };
    const notificationHub = connection.createHubProxy('notificationHub');
    notificationHub.on('NotifyUser', (message) => {
      NotificationHelper.createNotif(message);
    });
    connection.start({ jsonp: true });
  }

  logout() {
    gestureHandler.destroy();
    window.removeEventListener('resize', resizeHandlerEvent);
    AuthHelper.logout();
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
            <Menu.Item as={NavLink} activeClassName="active" to="/dashboard" onClick={() => this.handleSidenavBehaviorOnWindowSize()}>
              <Icon name="dashboard" />
              Dashboard
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              activeClassName="active"
              className={this.props.history.location.pathname === '/bet/submitBets' ? 'active' : ''}
              to="/bet/myBets"
              onClick={() => this.handleSidenavBehaviorOnWindowSize()}
            >
              <Icon name="ticket" />
              My Bets
            </Menu.Item>
            <Menu.Item as={NavLink} activeClassName="active" to="/bestBetters" onClick={() => this.handleSidenavBehaviorOnWindowSize()}>
              <Icon name="fire" />
              Top 50
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              activeClassName="active"
              to="/shop"
              className={this.props.history.location.pathname === '/items' ? 'active' : ''}
              onClick={() => this.handleSidenavBehaviorOnWindowSize()}
            >
              <Icon name="shop" />
              3wShop
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
                onClick={() => this.handleSidenavBehaviorOnWindowSize()}
              >
                <Icon name="angular" />
                    Admin
              </Menu.Item>
              )
            }
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
              <Route path="/bypass" component={ConsultProfileWithKey} />
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
