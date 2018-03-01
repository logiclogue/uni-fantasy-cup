const Ratings = require("football-score-sim/src/Ratings");
const Time = require("football-score-sim/src/Time");
const Period = require("football-score-sim/src/Period");
const PenaltyShootout = require("football-score-sim/src/PenaltyShootout");
const goals = require("football-score-sim/src/goalsFromRatings");

class Match {
    // [Team] -> Seed -> Match
    constructor(teams, seed) {
        this.home = teams[0];
        this.away = teams[1];
        this.timeLength = new Time().setMinutes(90);
        this.seed = seed;
    }

    // Match ~> Ratings
    get ratings() {
        return [this.home.rating, this.away.rating].toRatings();
    }

    // Match ~> Period
    get firstHalf() {
        const timeLength = new Time().setMinutes(45);
        const seed = this.seed.append("firstHalf");

        return new Period(timeLength, this.ratings, seed);
    }

    // Match ~> Period
    get secondHalf() {
        const timeLength = new Time().setMinutes(45);
        const seed = this.seed.append("secondHalf");

        return new Period(timeLength, this.ratings, seed);
    }

    // Match ~> Period
    get firstHalfExtraTime() {
        const timeLength = new Time().setMinutes(15);
        const seed = this.seed.append("firstHalfExtraTime");

        return new Period(timeLength, this.ratings, seed);
    }

    // Match ~> Period
    get secondHalfExtraTime() {
        const timeLength = new Time().setMinutes(15);
        const seed = this.seed.append("secondHalfExtraTime");

        return new Period(timeLength, this.ratings, seed);
    }

    // Match ~> Period
    get period() {
        return new Period(this.timeLength, this.ratings, this.seed);
    }

    // Match ~> Occurrences
    get normalTimeGoals() {
        return this.firstHalf.goals.append(this.secondHalf.goals);
    }

    // Match ~> Occurrences
    get extraTimeGoals() {
        const firstHalfGoals = this.firstHalfExtraTime.goals;
        const secondHalfGoals = this.secondHalfExtraTime.goals;

        return firstHalfGoals.append(secondHalfGoals);
    }

    // Match ~> Boolean
    get isExtraTime() {
        return this.normalTimeGoals.isDraw;
    }

    // Match ~> PenaltyShootout
    get penaltyShootout() {
        return PenaltyShootout.empty(2).simulate(this.seed);
    }

    // Match ~> Boolean
    get isPenaltyShootout() {
        return this.goals.isDraw;
    }

    // Match ~> Occurrences
    get goals() {
        if (this.normalTimeGoals.isDraw) {
            return this.normalTimeGoals.append(this.extraTimeGoals);
        }

        return this.normalTimeGoals;
    }

    // Match ~> Team
    get winner() {
        if (this.isPenaltyShootout) {
            return this.penaltyShootout.goals.winner([this.home, this.away]);
        }

        return this.goals.winner([this.home, this.away]);
    }
}

module.exports = Match;
