import Match from './Match';
import User from './User';
import moment from 'moment';

export default class Bet {
	Id!: string;
	Guid!: string;
	Match!: Match;
	User!: User;
	Date!: Date;
	HomeTeamScore: number = 0;
	AwayTeamScore: number = 0;
	PointsWon!: number;
	Status!: string;
	alreadyUpdated: boolean = false;


	constructor(data: any) {
		if (data.Id) this.Id = data.Id;
		if (data.Guid) this.Guid = data.Guid;
		if (data.Match) this.Match = new Match(data.Match);
		if (data.User) this.User = new User(data.User);
		if (data.Date) this.Date = moment(data.Date).toDate();
		if (data.HomeTeamScore) this.HomeTeamScore = data.HomeTeamScore;
		if (data.AwayTeamScore) this.AwayTeamScore = data.AwayTeamScore;
		if (data.PointsWon) this.PointsWon = data.PointsWon;
		if (data.Status) this.Status = data.Status;
		if (data.alreadyUpdated) this.alreadyUpdated = data.alreadyUpdated;
	}
}

