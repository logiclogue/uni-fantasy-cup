const Ratings = require("football-score-sim/src/Ratings");
const Time = require("football-score-sim/src/Time");
const Period = require("football-score-sim/src/Period");
const goals = require("football-score-sim/src/goalsFromRatings");

class Match {
    // Team -> Team -> Seed -> Match
    constructor(home, away, seed) {
        this.home = home;
        this.away = away;
        this.timeLength = new Time().setMinutes(90);
        this.seed = seed;
    }

    // Match ~> Ratings
    get ratings() {
        return [this.home.rating, this.away.rating].toRatings();
    }

    // Match ~> Period
    get period() {
        return new Period(this.timeLength, this.ratings, this.seed);
    }
}

module.exports = Match;
