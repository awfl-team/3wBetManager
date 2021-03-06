import store from '../store';
import CronHttpService from '../httpServices/CronHttpService';
import {
  setCompetitionTask, setMatchTask, setTeamTask,
} from '../actions/TaskManagerActions';
import { addSnackBar } from '../actions/SnackBarActions';


export default class CronHelper {
  static handleCompetitionTask() {
    store.dispatch(setCompetitionTask({
      isRunning: true,
      isCompleted: false,
      isFailed: false,
    }));
    CronHttpService.updateCompetitions().then(
      () => {
        store.dispatch(setCompetitionTask({
          isRunning: false,
          isCompleted: true,
          isFailed: false,
        }));
        store.dispatch(addSnackBar('Competition fetch finished', 'success'));
      },
    ).catch(
      () => {
        store.dispatch(setCompetitionTask({
          isRunning: false,
          isCompleted: false,
          isFailed: true,
        }));
      },
    );
  }

  static handleMatchTask() {
    store.dispatch(setMatchTask({ isRunning: true, isCompleted: false, isFailed: false }));

    CronHttpService.updateMatches().then(
      () => {
        store.dispatch(setMatchTask({ isRunning: false, isCompleted: true, isFailed: false }));
        store.dispatch(addSnackBar('Match fetch finished', 'success'));
      },
    ).catch(
      () => {
        store.dispatch(setMatchTask({
          isRunning: false,
          isCompleted: false,
          isFailed: true,
        }));
      },
    );
  }

  static handleTeamTask() {
    store.dispatch(setTeamTask({ isRunning: true, isCompleted: false, isFailed: false }));

    CronHttpService.updateTeams().then(
      () => {
        store.dispatch(setTeamTask({ isRunning: false, isCompleted: true, isFailed: false }));
        store.dispatch(addSnackBar('Team fetch finished', 'success'));
      },
    ).catch(
      () => {
        store.dispatch(setTeamTask({
          isRunning: false,
          isCompleted: false,
          isFailed: true,
        }));
      },
    );
  }
}
