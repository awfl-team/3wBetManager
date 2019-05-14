import moment from 'moment';
import Competition from './Competition';
import Team from './Team';

export default class Match {
  public Id!: number;
  public Competition!: Competition;
  public LastUpdated!: Date;
  public HomeTeam!: Team;
  public AwayTeam!: Team;
	// TODO Create Score class
  public Score!: object;
  public UtcDate!: Date;

  constructor(data: any) {
    if (data.Id) { this.Id = data.Id; }
    if (data.Competition) { this.Competition = new Competition(data.Competition); }
    if (data.LastUpdated) { this.LastUpdated = moment(data.Date).toDate(); }
    if (data.HomeTeam) { this.HomeTeam = new Team(data.HomeTeam); }
    if (data.AwayTeam) { this.AwayTeam = new Team(data.AwayTeam); }
    if (data.Score) { this.Score = data.Score; }
    if (data.UtcDate) { this.UtcDate = moment(data.UtcDate).toDate(); }
  }
}
