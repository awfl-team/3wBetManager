import React from 'react';
import { Button, Container, Header, Icon, List, Progress } from 'semantic-ui-react';
import withAuthAdmin from '../AuthGuardAdmin/AuthGuardAdmin';
import CronService from '../../service/CronService';

class AdminTaskManager extends React.Component {
  state = {
    isTaskRunning: false,
    taskFailed: false,
    isCompetitionsTaskRunning: false,
    isAllTasksRunning: false,
    isTeamsTaskRunning: false,
    isMatchesTaskRunning: false,
    isCompetitionsTaskCompleted: false,
    isAllTasksCompleted: false,
    isTeamsTaskCompleted: false,
    isMatchesTaskCompleted: false,
    competitionsTaskValue: 0,
    teamsTaskValue: 0,
    matchesTaskValue: 0,
    allTasksValue: 0,
  };

  handleCronAll = () => {
    let teamsInterval;
    this.setState({ isAllTasksRunning: true, isTaskRunning: true, isAllTasksCompleted: false, allTasksValue: 0, taskFailed: false });
    const allInterval = setInterval(() => {
      this.setState({ allTasksValue: this.state.allTasksValue + 0.83 });
    }, 2000);
    this.setState({ isCompetitionsTaskRunning: true, isTeamsTaskRunning: true, isMatchesTaskRunning: true, isCompetitionsTaskCompleted: false, competitionsTaskValue: 0 });
    const competitionInterval = setInterval(() => {
      this.setState({ competitionsTaskValue: this.state.competitionsTaskValue + 1.66 });
    }, 2000);

    setTimeout(() => {
      this.setState({ isCompetitionsTaskRunning: false, isCompetitionsTaskCompleted: true, competitionsTaskValue: 100 });
      teamsInterval = setInterval(() => {
        this.setState({ teamsTaskValue: this.state.teamsTaskValue + 1.66 });
      }, 2000);
    }, 120000);
    setTimeout(() => {
      this.setState({ isTeamsTaskRunning: false, isTeamsTaskCompleted: true, teamsTaskValue: 100 });
      this.setState({ isMatchesTaskRunning: false, isMatchesTaskCompleted: true, matchesTaskValue: 100 });
    }, 255000);

    CronService.updateAll().then(
      () => {
        this.setState({ isAllTasksRunning: false });
        this.setState({ isTaskRunning: false });
        this.setState({ isAllTasksCompleted: true });
        clearInterval(allInterval);
        clearInterval(competitionInterval);
        clearInterval(teamsInterval);
        this.setState({ allTasksValue: 100 });
      },
    ).catch(
      () => {
        this.setState({ isAllTasksRunning: false });
        this.setState({ isAllTasksCompleted: false });
        this.setState({ isCompetitionsTaskRunning: false });
        this.setState({ isCompetitionsTaskCompleted: false });
        this.setState({ isTeamsTaskRunning: false });
        this.setState({ isTeamsTaskCompleted: false });
        this.setState({ isMatchesTaskRunning: false });
        this.setState({ isMatchesTaskCompleted: false });
        this.setState({ matchesTaskValue: 0 });
        this.setState({ allTasksValue: 0 });
        this.setState({ competitionsTaskValue: 0 });
        this.setState({ teamsTaskValue: 0 });
        this.setState({ isTaskRunning: false });
        this.setState({ taskFailed: true });
        clearInterval(allInterval);
        clearInterval(competitionInterval);
        clearInterval(teamsInterval);
      },
    );
  };

  handleCronCompetitions = () => {
    this.setState({ isCompetitionsTaskRunning: true, isTaskRunning: true, isCompetitionsTaskCompleted: false, competitionsTaskValue: 0, taskFailed: false });
    const valueInterval = setInterval(() => {
      this.setState({ competitionsTaskValue: this.state.competitionsTaskValue + 1.66 });
    }, 2000);
    CronService.updateCompetitions().then(
      () => {
        this.setState({ isCompetitionsTaskRunning: false });
        this.setState({ isTaskRunning: false });
        this.setState({ isCompetitionsTaskCompleted: true });
        clearInterval(valueInterval);
        this.setState({ competitionsTaskValue: 100 });
      },
    ).catch(
      () => {
        this.setState({ isCompetitionsTaskRunning: false });
        this.setState({ isCompetitionsTaskCompleted: false });
        this.setState({ isTaskRunning: false });
        clearInterval(valueInterval);
        this.setState({ taskFailed: true });
        this.setState({ competitionsTaskValue: 0 });
      },
    );
  };

  handleCronTeams = () => {
    this.setState({ isTeamsTaskRunning: true, isTaskRunning: true, isTeamsTaskCompleted: false, teamsTaskValue: 0, taskFailed: false });
    const valueInterval = setInterval(() => {
      this.setState({ teamsTaskValue: this.state.teamsTaskValue + 1.66 });
    }, 2000);
    CronService.updateTeams().then(
      () => {
        this.setState({ isTeamsTaskRunning: false });
        this.setState({ isTaskRunning: false });
        this.setState({ isTeamsTaskCompleted: true });
        this.setState({ taskFailed: true });
        clearInterval(valueInterval);
      },
    ).catch(
      () => {
        this.setState({ isTeamsTaskRunning: false });
        this.setState({ isTeamsTaskCompleted: false });
        this.setState({ isTaskRunning: false });
        clearInterval(valueInterval);
        this.setState({ teamsTaskValue: 0 });
        this.setState({ taskFailed: true });
      },
    );
  };

  handleCronMatches = () => {
    this.setState({ isMatchesTaskRunning: true, isTaskRunning: true, isMatchesTaskCompleted: false, matchesTaskValue: 0, taskFailed: false });
    CronService.updateMatches().then(
      () => {
        this.setState({ isMatchesTaskRunning: false });
        this.setState({ isTaskRunning: false });
        this.setState({ isMatchesTaskCompleted: true });
        this.setState({ matchesTaskValue: 100 });
      },
    ).catch(
      () => {
        this.setState({ isMatchesTaskRunning: false });
        this.setState({ isMatchesTaskCompleted: false });
        this.setState({ matchesTaskValue: 0 });
        this.setState({ isTaskRunning: false });
        this.setState({ taskFailed: true });
      },
    );
  };

  render() {
    const {
      isTaskRunning,
      isCompetitionsTaskRunning,
      isTeamsTaskRunning,
      isMatchesTaskRunning,
      isCompetitionsTaskCompleted,
      isMatchesTaskCompleted,
      isTeamsTaskCompleted,
      competitionsTaskValue,
      teamsTaskValue,
      matchesTaskValue,
      allTasksValue,
      isAllTasksCompleted,
      isAllTasksRunning,
      taskFailed,
    } = this.state;
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
                <h3><Icon name="cloud download" />Run all tasks</h3>
                <Progress percent={Math.round(allTasksValue)}
                          active={isAllTasksRunning}
                          color={isAllTasksRunning === true ? 'blue' : 'grey'}
                          success={isAllTasksCompleted}
                          error={taskFailed}
                >
                  { isAllTasksRunning === true
                  && 'The task is running'
                  }
                  { isAllTasksCompleted === true
                  && 'The task is completed'
                  }
                  { taskFailed === true
                  && 'The task failed'
                  }
                </Progress>
                <div className="button-container">
                  <Button onClick={this.handleCronAll} disabled={isTaskRunning} color={isAllTasksRunning === true ? 'blue' : 'grey'}>
                    RUN
                  </Button>
                </div>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content className="task-list-content">
                <h3><Icon name="trophy" />Update competitions</h3>
                <Progress percent={Math.round(competitionsTaskValue)}
                          active={isCompetitionsTaskRunning}
                          color={isCompetitionsTaskRunning === true ? 'blue' : 'grey'}
                          success={isCompetitionsTaskCompleted}
                          error={taskFailed}
                >
                  { isCompetitionsTaskRunning === true
                  && 'The task is running'
                  }
                  { isCompetitionsTaskCompleted === true
                  && 'The task is completed'
                  }
                  { taskFailed === true
                  && 'The task failed'
                  }
                </Progress>
                <div className="button-container">
                  <Button onClick={this.handleCronCompetitions} disabled={isTaskRunning} color={isCompetitionsTaskRunning === true ? 'blue' : 'grey'}>
                    RUN
                  </Button>
                </div>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content className="task-list-content">
                <h3><Icon name="users" />Uptate teams</h3>
                <Progress percent={Math.round(teamsTaskValue)}
                          active={isTeamsTaskRunning}
                          color={isTeamsTaskRunning === true ? 'blue' : 'grey'}
                          success={isTeamsTaskCompleted}
                          error={taskFailed}
                >
                  { isTeamsTaskRunning === true
                  && 'The task is running'
                  }
                  { isTeamsTaskCompleted === true
                  && 'The task is completed'
                  }
                  { taskFailed === true
                  && 'The task failed'
                  }
                </Progress>
                <div className="button-container">
                  <Button onClick={this.handleCronTeams} disabled={isTaskRunning} color={isTeamsTaskRunning === true ? 'blue' : 'grey'}>
                    RUN
                  </Button>
                </div>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content className="task-list-content">
                <h3><Icon name="soccer" />Update matches</h3>
                <Progress percent={Math.round(matchesTaskValue)}
                          active={isMatchesTaskRunning}
                          color={isMatchesTaskRunning === true ? 'blue' : 'grey'}
                          success={isMatchesTaskCompleted}
                          error={taskFailed}
                >
                  { isMatchesTaskRunning === true
                  && 'The task is running'
                  }
                  { isMatchesTaskCompleted === true
                  && 'The task is completed'
                  }
                  { taskFailed === true
                  && 'The task failed'
                  }
                </Progress>
                <div className="button-container">
                  <Button onClick={this.handleCronMatches} disabled={isTaskRunning} color={isMatchesTaskRunning === true ? 'blue' : 'grey'}>
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

export default withAuthAdmin(AdminTaskManager);
