import { SET_COMPETITION_TASK, SET_MATCH_TASK, SET_TEAM_TASK } from '../actions/TaskManagerActions';

const competitionTask = { isRunning: false, isCompleted: false, isFailed: false };
const teamTask = { isRunning: false, isCompleted: false, isFailed: false };
const matchTask = { isRunning: false, isCompleted: false, isFailed: false };

const defaultTasksState = { competitionTask, teamTask, matchTask };

const taskManager = (state = defaultTasksState, action) => {
  switch (action.type) {
    case SET_COMPETITION_TASK:
      return Object.assign({}, state, {
        competitionTask: action.task,
      });
    case SET_MATCH_TASK:
      return Object.assign({}, state, {
        matchTask: action.task,
      });
    case SET_TEAM_TASK:
      return Object.assign({}, state, {
        teamTask: action.task,
      });
    default:
      return state;
  }
};

export default taskManager;
