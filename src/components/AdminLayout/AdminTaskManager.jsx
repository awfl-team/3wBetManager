import React from 'react';
import {Button, Container, Header, Icon, List, Progress} from 'semantic-ui-react';
import withAuthAdmin from '../AuthGuardAdmin/AuthGuardAdmin';

class AdminTaskManager extends React.Component {
  render() {

    return (
      <div id="tasks">
        <Header as="h2" icon textAlign="center">
          <Icon name="cogs" circular />
          <Header.Content>Tasks</Header.Content>
        </Header>
        <Container>
          <List verticalAlign='middle'>
            <List.Item>
              <List.Content className="task-list-content">
                <span><Icon name="soccer" />Update competitions</span>
                <Progress percent={0} active>
                  The task is running
                </Progress>
                <div className="button-container">
                  <Button>RUN</Button>
                </div>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content className="task-list-content">
                <span><Icon name="soccer" />Uptate teams</span>
                <Progress percent={0} active>
                  The task is running
                </Progress>
                <div className="button-container">
                  <Button>RUN</Button>
                </div>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content className="task-list-content">
                <span><Icon name="soccer" />Update matches</span>
                <Progress percent={0} active>
                  The task is running
                </Progress>
                <div className="button-container">
                  <Button>RUN</Button>
                </div>
              </List.Content>
            </List.Item>
          </List>
        </Container>
      </div>
    );
  }


}

export default withAuthAdmin(AdminTaskManager);
