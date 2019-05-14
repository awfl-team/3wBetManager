import moment from 'moment';
import Match from './Match';
import User from './User';

export default class Bet {
  public static STATUS_PERFECT: string = 'Perfect';
  public static STATUS_OK: string = 'Ok';
  public static STATUS_WRONG: string = 'Wrong';

  public Id!: string;
  public Guid!: string;
  public Match!: Match;
  public Multiply!: number;
  public User!: User;
  public Date!: Date;
  public HomeTeamScore: number = 0;
  public AwayTeamScore: number = 0;
  public PointsWon!: number;
  public Status!: string;
  public alreadyUpdated: boolean = false;

  constructor(data: any) {
    if (data.Id) { this.Id = data.Id; }
    if (data.Guid) { this.Guid = data.Guid; }
    if (data.Match) { this.Match = new Match(data.Match); }
    if (data.Multiply) { this.Multiply = data.Multiply; }
    if (data.User) { this.User = new User(data.User); }
    if (data.Date) { this.Date = moment(data.Date).toDate(); }
    if (data.HomeTeamScore) { this.HomeTeamScore = data.HomeTeamScore; }
    if (data.AwayTeamScore) { this.AwayTeamScore = data.AwayTeamScore; }
    if (data.PointsWon) { this.PointsWon = data.PointsWon; }
    if (data.Status) { this.Status = data.Status; }
    if (data.alreadyUpdated) { this.alreadyUpdated = data.alreadyUpdated; }
  }
}
