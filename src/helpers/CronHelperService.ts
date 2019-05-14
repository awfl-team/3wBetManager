import { addSnackBar } from '../actions/SnackBarActions';
import {
  setCompetitionTask, setMatchTask, setTeamTask,
} from '../actions/TaskManagerActions';
import store from '../store';
import CronService from '../service/CronService';

export default class CronHelperService {
  public static handleCompetitionTask() {
    store.dispatch(setCompetitionTask({
      isCompleted: false,
      isFailed: false,
      isRunning: true,
    }));
    CronService.updateCompetitions().then(
      () => {
        store.dispatch(setCompetitionTask({
          isCompleted: true,
          isFailed: false,
          isRunning: false,
        }));
        store.dispatch(addSnackBar('Competition fetch finished', 'success'));
      },
    ).catch(
      () => {
        store.dispatch(setCompetitionTask({
          isCompleted: false,
          isFailed: true,
          isRunning: false,
        }));
      },
    );
  }

  public static handleMatchTask() {
    store.dispatch(setMatchTask({ isRunning: true, isCompleted: false, isFailed: false }));

    CronService.updateMatches().then(
      () => {
        store.dispatch(setMatchTask({ isRunning: false, isCompleted: true, isFailed: false }));
        store.dispatch(addSnackBar('Match fetch finished', 'success'));
      },
    ).catch(
      () => {
        store.dispatch(setMatchTask({
          isCompleted: false,
          isFailed: true,
          isRunning: false,
        }));
      },
    );
  }

  public static handleTeamTask() {
    store.dispatch(setTeamTask({ isRunning: true, isCompleted: false, isFailed: false }));

    CronService.updateTeams().then(
      () => {
        store.dispatch(setTeamTask({ isRunning: false, isCompleted: true, isFailed: false }));
        store.dispatch(addSnackBar('Team fetch finished', 'success'));
      },
    ).catch(
      () => {
        store.dispatch(setTeamTask({
          isCompleted: false,
          isFailed: true,
          isRunning: false,
        }));
      },
    );
  }
}
