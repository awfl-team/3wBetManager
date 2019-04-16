export default class Bet {
    static STATUS_PERFECT = 'Perfect';

    static STATUS_OK = 'Ok';

    static STATUS_WRONG = 'Wrong';

    Id;

    Guid;

    Match;

    Multiply;

    User;

    Date = new Date();

    HomeTeamScore = 0;

    AwayTeamScore = 0;

    PointsWon;

    Status;

    alreadyUpdated = false;
}
