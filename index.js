const _ = require("lodash");
const Match = require("./src/Match");
const Seed = require("football-score-sim/src/Seed");
const config = require("./config.json");
const robin = require("roundrobin");
const teams = require("./src/teams");

// Match -> String
function matchToString(match) {
    const home = match.home.name;
    const away = match.away.name;
    const score = match.period.goals.value;

    return home + ' ' + score[0] + '-' + score[1] + ' ' + away;
}

// Seed -> (Team -> Team -> Match)
function toMatch(seed) {
    return (home, away) => new Match(home, away, seed);
}

teams.then(teams => {
    const seed = "testing".toSeed();
    const match = new Match(teams[0], teams[1], seed);
    const matches = robin(teams.length, teams);

    const results = _(matches)
        .flatMap(toMatch(seed))
        .map(matchToString)
        .value();

    console.log(results);
    console.log(matchToString(match));
});
