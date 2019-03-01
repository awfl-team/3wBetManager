export const SET_COMPETITION_TASK = 'SET_COMPETITION_TASK';
export const SET_TEAM_TASK = 'SET_TEAM_TASK';
export const SET_MATCH_TASK = 'SET_MATCH_TASK';

export function setCompetitionTask(task) {
  return { type: SET_COMPETITION_TASK, task };
}

export function setTeamTask(task) {
  return { type: SET_TEAM_TASK, task };
}

export function setMatchTask(task) {
  return { type: SET_MATCH_TASK, task };
}
