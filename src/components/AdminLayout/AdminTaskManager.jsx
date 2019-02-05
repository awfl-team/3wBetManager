import React from 'react';
import { Button, Container, Header, Icon, List, Progress } from 'semantic-ui-react';
import withAuthAdmin from '../AuthGuardAdmin/AuthGuardAdmin';
import CronService from '../../service/CronService';

class AdminTaskManager extends React.Component {
  state = {
    isTaskRunning: false,
    isCompetitionsTaskRunning: false,
    isTeamsTaskRunning: false,
    isMatchesTaskRunning: false,
    isCompetitionsTaskCompleted: false,
    isTeamsTaskCompleted: false,
    isMatchesTaskCompleted: false,
    competitionsTaskValue: 0,
    teamsTaskValue: 0,
    matchesTaskValue: 0,
  };

  handleCronCompetitions = () => {
    this.setState({ isCompetitionsTaskRunning: true, isTaskRunning: true, isCompetitionsTaskCompleted: false, competitionsTaskValue: 0 });
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
        this.setState({ isTaskRunning: false });
        this.setState({ isCompetitionsTaskCompleted: false });
        clearInterval(valueInterval);
        this.setState({ competitionsTaskValue: 0 });
      },
    );
  };

  handleCronTeams = () => {
    this.setState({ isTeamsTaskRunning: true, isTaskRunning: true, isTeamsTaskCompleted: false, teamsTaskValue: 0 });
    const valueInterval = setInterval(() => {
      this.setState({ teamsTaskValue: this.state.teamsTaskValue + 1.66 });
    }, 2000);
    CronService.updateTeams().then(
      () => {
        this.setState({ isTeamsTaskRunning: false });
        this.setState({ isTaskRunning: false });
        this.setState({ isTeamsTaskCompleted: true });
        clearInterval(valueInterval);
      },
    ).catch(
      () => {
        this.setState({ isTeamsTaskRunning: false });
        this.setState({ isTaskRunning: false });
        this.setState({ isTeamsTaskCompleted: false });
        clearInterval(valueInterval);
        this.setState({ teamsTaskValue: 0 });
      },
    );
  };

  handleCronMatches = () => {
    this.setState({ isMatchesTaskRunning: true, isTaskRunning: true, isMatchesTaskCompleted: false, matchesTaskValue: 0 });
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
        this.setState({ isTaskRunning: false });
        this.setState({ isMatchesTaskCompleted: false });
        this.setState({ matchesTaskValue: 0 });
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
                <h3><Icon name="trophy" />Update competitions</h3>
                <Progress percent={Math.round(competitionsTaskValue)}
                          active={isCompetitionsTaskRunning}
                          color={isCompetitionsTaskRunning === true ? 'blue' : 'grey'}
                          success={isCompetitionsTaskCompleted}
                >
                  { isCompetitionsTaskRunning === true
                  && 'The task is running'
                  }
                  { isCompetitionsTaskCompleted === true
                  && 'The task is completed'
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
                >
                  { isTeamsTaskRunning === true
                  && 'The task is running'
                  }
                  { isTeamsTaskCompleted === true
                  && 'The task is completed'
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
                >
                  { isMatchesTaskRunning === true
                  && 'The task is running'
                  }
                  { isMatchesTaskCompleted === true
                  && 'The task is completed'
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
