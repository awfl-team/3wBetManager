import React from 'react';
import connect from 'react-redux/es/connect/connect';
import {
  Button, Container, Header, Icon, List, Progress,
} from 'semantic-ui-react';
import withAuthAdmin from '../AuthGuardAdmin/AuthGuardAdmin';
import CronHelperService from '../../service/helpers/CronHelperService';


const mapStateToProps = state => ({ taskManager: state.taskManager });


class AdminTaskManagerComponent extends React.Component {
  handleCronCompetitions = () => {
    CronHelperService.handleCompetitionTask();
  };

  handleCronTeams = () => {
    CronHelperService.handleTeamTask();
  };

  handleCronMatches = () => {
    CronHelperService.handleMatchTask();
  };

  render() {
    const {
      taskManager,
    } = this.props;

    const competitionTask = taskManager.competitionTask;
    const matchTask = taskManager.matchTask;
    const teamTask = taskManager.teamTask;
    const isAnyTaskRunning = (competitionTask.isRunning || matchTask.isRunning
        || teamTask.isRunning);

    return (
      <div id="tasks">
        <Header as="h1" icon textAlign="center">
          <Icon name="cogs" circular />
          <Header.Content>Tasks</Header.Content>
        </Header>
        <Container>
          <List verticalAlign="middle">
            <List.Item>
              <List.Content className="task-list-content">
                <h3>
                  <Icon name="trophy" />
Update competitions
                </h3>
                <Progress
                  percent={100}
                  active={competitionTask.isRunning}
                  color={competitionTask.isRunning === true ? 'blue' : 'grey'}
                  success={competitionTask.isCompleted}
                  error={competitionTask.isFailed}
                >
                  { competitionTask.isRunning === true
                  && 'The task is running'
                  }
                  { competitionTask.isCompleted === true
                  && 'The task is completed'
                  }
                  { competitionTask.isFailed === true
                  && 'The task failed'
                  }
                </Progress>
                <div className="button-container">
                  <Button
                    onClick={this.handleCronCompetitions}
                    disabled={isAnyTaskRunning}
                    color={competitionTask.isRunning
                    === true ? 'blue' : 'grey'}
                  >
                    RUN
                  </Button>
                </div>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content className="task-list-content">
                <h3>
                  <Icon name="users" />
Uptate teams
                </h3>
                <Progress
                  percent={100}
                  active={teamTask.isRunning}
                  color={teamTask.isRunning === true ? 'blue' : 'grey'}
                  success={teamTask.isCompleted}
                  error={teamTask.isFailed}
                >
                  { teamTask.isRunning === true
                  && 'The task is running'
                  }
                  { teamTask.isCompleted === true
                  && 'The task is completed'
                  }
                  { teamTask.isFailed === true
                  && 'The task failed'
                  }
                </Progress>
                <div className="button-container">
                  <Button onClick={this.handleCronTeams} disabled={isAnyTaskRunning} color={teamTask.isRunning === true ? 'blue' : 'grey'}>
                    RUN
                  </Button>
                </div>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content className="task-list-content">
                <h3>
                  <Icon name="soccer" />
Update matches
                </h3>
                <Progress
                  percent={100}
                  active={matchTask.isRunning}
                  color={matchTask.isRunning === true ? 'blue' : 'grey'}
                  success={matchTask.isCompleted}
                  error={matchTask.isFailed}
                >
                  { matchTask.isRunning === true
                  && 'The task is running'
                  }
                  { matchTask.isCompleted === true
                  && 'The task is completed'
                  }
                  { matchTask.isFailed === true
                  && 'The task failed'
                  }
                </Progress>
                <div className="button-container">
                  <Button
                    onClick={this.handleCronMatches}
                    disabled={isAnyTaskRunning}
                    color={matchTask.isRunning === true ? 'blue' : 'grey'}
                  >
                    RUN
                  </Button>
                </div>
              </List.Content>
            </List.Item>
          </List>
        </Container>
      </div>
    );
  }
}

const AdminTaskManager = connect(mapStateToProps)(AdminTaskManagerComponent);
export default withAuthAdmin(AdminTaskManager);
