import React, { ComponentState } from 'react';
import AuthService from '../../service/AuthService';
import User from '../../model/User';

interface AuthGuardAdminState extends ComponentState {
  user?: User;
}

export default function withAuthAdmin(Component: any) {
  return class AuthGuardAdmin extends React.Component<any, AuthGuardAdminState> {
    state : { user: User|undefined } = { user: undefined };

    componentDidMount() {
      const token = AuthService.getToken();
      if (!token) {
        this.props.history.push('/404');
      } else {
        try {
          const userInfo = AuthService.getUserInfo(token);
          if (userInfo.email
            && userInfo.unique_name
            && userInfo.role
            && userInfo.role === 'ADMIN') {
            this.setState({ user: userInfo });
          } else {
            this.props.history.push('/404');
          }
        } catch (err) {
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
