const Ratings = require("football-score-sim/src/Ratings");

class Match {
    // Team -> Team -> Match
    constructor(home, away) {
        this.home = home;
        this.away = away;
    }

    // Ratings
    toRatings() {
        return [this.home.rating, this.away.rating].toRatings();
    }
}

module.exports = Match;
