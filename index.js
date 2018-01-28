const _ = require("lodash");
const Match = require("./src/Match");
const Seed = require("football-score-sim/src/Seed");
const config = require("./config.json");
const robin = require("roundrobin");
const teams = require("./src/teams");

teams.then(teams => {
    const seed = "testing".toSeed();
    const match = new Match(teams[0], teams[1], seed);

    console.log(robin(teams.length, teams));

    console.log(match.period.goals);

});
