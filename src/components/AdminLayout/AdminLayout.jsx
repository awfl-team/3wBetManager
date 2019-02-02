import React from 'react';
import withAuthAdmin from '../AuthGuard/AuthGuard';
import {Container, Grid, Icon} from 'semantic-ui-react';
import {Link, Route} from 'react-router-dom';
import AdminUserTable from './AdminUserTable';
import AdminTaskManager from './AdminTaskManager';

class AdminLayout extends React.Component {
  render() {
    return (
      <div id="AdminLayout">
        <Container fluid>
          <Grid>
            <Grid.Column floated="right" width={5}>
              <div align="right">
                {this.props.history.location.pathname === '/admin/tasks' && (
                  <Link to="/admin/users" className="ui green icon right labeled button">
                    Manage users
                    <Icon name="right arrow" />
                  </Link>
                )}
                {this.props.history.location.pathname === '/admin/users' && (
                  <Link to="/admin/tasks" className="ui green icon right labeled button">
                    Manage tasks
                    <Icon name="right arrow" />
                  </Link>
                )}
              </div>
            </Grid.Column>
          </Grid>
        </Container>
        <Container fluid>
          <Route path="/admin/users" component={AdminUserTable} />
          <Route path="/admin/tasks" component={AdminTaskManager} />
        </Container>
      </div>
    );
  }
}

export default withAuthAdmin(AdminLayout);
