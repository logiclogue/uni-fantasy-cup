const _ = require("lodash");
const cheerio = require("cheerio");
const request = require("request-promise");
const Team = require("./Team");
const config = require("../config.json");

const nameSelector = "tr.league-table-row > td:nth-child(4) > a:nth-child(1)";
const ratingSelector = "tr.league-table-row > td:nth-child(9)";

// Promise [Team]
module.exports = new Promise((resolve, reject) => {
    request(config.url).then(response => {
        const $ = cheerio.load(response);

        const names = _($(nameSelector))
            .map(j => j.children[0].data)
            .value();

        const ratings = _($(ratingSelector))
            .map(j => j.children[0].data)
            .map(_.toNumber)
            .map(score => score * config.weighting)
            .value();

        const teams = _.zipWith(names, ratings, (name, rating) => {
            return new Team(name, rating);
        });

        return resolve(teams);
    }).catch(reject);
});
