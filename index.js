const _ = require("lodash");
const cheerio = require("cheerio");
const request = require("request-promise");
const Team = require("./src/Team");
const Match = require("./src/Match");
const goals = require("football-score-sim/src/goalsFromRatings");
const Time = require("football-score-sim/src/Time");
const Seed = require("football-score-sim/src/Seed");
const Period = require("football-score-sim/src/Period");
const config = require("./config.json");
const robin = require("roundrobin");

const url = config.url;

request(url).then(response => {
    const $ = cheerio.load(response);

    const names = _($("tr.league-table-row > td:nth-child(4) > a:nth-child(1)"))
        .map(j => j.children[0].data)
        .value();

    const ratings = _($("tr.league-table-row > td:nth-child(9)"))
        .map(j => j.children[0].data)
        .map(_.toNumber)
        .map(score => score * config.weighting)
        .value();

    const teams = _.zipWith(names, ratings, (name, rating) =>
        new Team(name, rating));

    const seed = "testing".toSeed();
    const match = new Match(teams[0], teams[1], seed);

    console.log(robin(teams.length, teams));

    console.log(match.period.goals);
});
