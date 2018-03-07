const _ = require("lodash");
const Match = require("./src/Match");
const Seed = require("football-score-sim/src/Seed");
const times = require("football-score-sim/src/times");
const Time = require("football-score-sim/src/Time");
const config = require("./config.json");
const robin = require("roundrobin");
const TournamentCreator = require("knockout-tournament");
const teams = require("./src/teams");

// Match -> String
function matchToString(match) {
    const home = match.home.name;
    const away = match.away.name;
    const score = match.goals.value;

    const output = home + " " + score[0] + "-" + score[1] + " " + away;

    if (match.isPenaltyShootout) {
        const score = match.penaltyShootout.goals.value;

        return output + " (p) " + score[0] + "-" + score[1];
    } else if (match.isExtraTime) {
        return output + " (aet)"
    }

    return output;
}

// Round -> Number -> String
function roundToString(round, i) {
    const number = i + 1;

    const matches = _(round.matches)
        .map(matchToString)
        .thru(xs => xs.join("\n"))
        .value();

    return "Round " + number + "\n" + matches;
}

// Seed -> ([Team] -> Match)
function toMatch(seed) {
    return teams => new Match(teams, seed);
}

teams.then(teams => {
    const seed = "testing".toSeed();
    const creator = new TournamentCreator(
        match => match.winner,
        match => null,
        (round, n, pair) => new Match(pair, seed.append(round).append(n))
    );
    const tournament = creator.createRandomTournament(teams, seed.value);

    const output = _(tournament.rounds)
        .map(roundToString)
        .thru(xs => xs.join("\n\n"))
        .value();

    console.log(output);
});
