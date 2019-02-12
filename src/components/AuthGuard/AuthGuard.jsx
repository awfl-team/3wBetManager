import React from 'react';
import AuthService from '../../service/AuthService';

export default function withAuth(Component) {
  return class AuthGuard extends React.Component {
      state = { user: null };

      componentWillMount() {
        const token = AuthService.getToken();
        if (!token) {
        // @todo addSnackBar
          this.props.history.push('/404');
        } else {
          try {
            const userInfo = AuthService.getUserInfo(token);
            if (userInfo.email && userInfo.unique_name && userInfo.role) {
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
        if (this.state.user) {
          return (
            <Component history={this.props.history} user={this.state.user} />
          );
        }
        return null;
      }
  };
}