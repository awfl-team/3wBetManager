export default class Bet {
    static STATUS_PERFECT = 'Perfect';

    static STATUS_OK = 'Perfect';

    static STATUS_WRONG = 'Perfect';

    Id;

    Guid;

    Match;

    User;

    Date = new Date();

    HomeTeamScore = 0;

    AwayTeamScore = 0;

    PointsWon;

    Status;

    alreadyUpdated = false;
}
