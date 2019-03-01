import React from 'react';
import AuthService from '../../service/AuthService';

export default function withAuthAdmin(Component) {
  return class AuthGuardAdmin extends React.Component {
      state = { user: null };

      componentDidMount() {
        const token = AuthService.getToken();
        if (!token) {
        // @todo addSnackBar
          this.props.history.push('/404');
        } else {
          try {
            const userInfo = AuthService.getUserInfo(token);
            if (userInfo.email && userInfo.unique_name && userInfo.role && userInfo.role === 'ADMIN') {
              this.setState({ user: userInfo });
            } else {
              this.props.history.push('/404');
            }
          } catch (err) {
          // @todo addSnackBar
            this.props.history.push('/404');
          }
        }
      }

      render() {
        const { user } = this.state;

        if (user) {
          return (
            <Component history={this.props.history} user={user} />
          );
        }
        return null;
      }
  };
}