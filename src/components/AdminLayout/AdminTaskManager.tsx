import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Container, Header, Icon, List, Progress,
} from 'semantic-ui-react';
import withAuthAdmin from '../AuthGuardAdmin/AuthGuardAdmin';
import CronHelperService from '../../helpers/CronHelperService';

const mapStateToProps = state => ({ taskManager: state.taskManager });

class AdminTaskManagerComponent extends React.Component {
  handleCronCompetitions = () => {
    CronHelperService.handleCompetitionTask();
  }

  handleCronTeams = () => {
    CronHelperService.handleTeamTask();
  }

  handleCronMatches = () => {
    CronHelperService.handleMatchTask();
  }

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
        <Header as="h1" icon={true} textAlign="center">
          <Icon name="cogs" circular={true} />
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
                  color={competitionTask.isRunning ? 'blue' : 'grey'}
                  success={competitionTask.isCompleted}
                  error={competitionTask.isFailed}
                >
                  { competitionTask.isRunning
                  && 'The task is running'
                  }
                  { competitionTask.isCompleted
                  && 'The task is completed'
                  }
                  { competitionTask.isFailed
                  && 'The task failed'
                  }
                </Progress>
                <div className="button-container">
                  <Button
                    onClick={this.handleCronCompetitions}
                    disabled={isAnyTaskRunning}
                    color={competitionTask.isRunning ? 'blue' : 'grey'}
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
                  Update teams
                </h3>
                <Progress
                  percent={100}
                  active={teamTask.isRunning}
                  color={teamTask.isRunning ? 'blue' : 'grey'}
                  success={teamTask.isCompleted}
                  error={teamTask.isFailed}
                >
                  { teamTask.isRunning
                  && 'The task is running'
                  }
                  { teamTask.isCompleted
                  && 'The task is completed'
                  }
                  { teamTask.isFailed
                  && 'The task failed'
                  }
                </Progress>
                <div className="button-container">
                  <Button
                    onClick={this.handleCronTeams}
                    disabled={isAnyTaskRunning}
                    color={teamTask.isRunning ? 'blue' : 'grey'}
                  >
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
                  color={matchTask.isRunning ? 'blue' : 'grey'}
                  success={matchTask.isCompleted}
                  error={matchTask.isFailed}
                >
                  { matchTask.isRunning
                  && 'The task is running'
                  }
                  { matchTask.isCompleted
                  && 'The task is completed'
                  }
                  { matchTask.isFailed
                  && 'The task failed'
                  }
                </Progress>
                <div className="button-container">
                  <Button
                    onClick={this.handleCronMatches}
                    disabled={isAnyTaskRunning}
                    color={matchTask.isRunning ? 'blue' : 'grey'}
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

const adminTaskManager = connect(mapStateToProps)(AdminTaskManagerComponent);
export default withAuthAdmin(adminTaskManager);
