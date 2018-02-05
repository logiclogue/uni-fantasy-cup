const Ratings = require("football-score-sim/src/Ratings");
const Time = require("football-score-sim/src/Time");
const Period = require("football-score-sim/src/Period");
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
    get period() {
        return new Period(this.timeLength, this.ratings, this.seed);
    }

    // Match ~> Occurrences
    get goals() {
        return this.firstHalf.goals.append(this.secondHalf.goals);
    }
}

module.exports = Match;
