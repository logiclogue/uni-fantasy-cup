const _ = require("lodash");
const cheerio = require("cheerio");
const request = require("request-promise");

const url = "https://www.thecompleteuniversityguide.co.uk/league-tables/rankings";

request(url).then(response => {
    const $ = cheerio.load(response);

    const names = _($("tr.league-table-row > td:nth-child(4) > a:nth-child(1)"))
        .map(j => j.children[0].data)
        .value();

    const ratings = _($("tr.league-table-row > td:nth-child(9)"))
        .map(j => j.children[0].data)
        .map(_.toNumber)
        .map(score => score * 1.64)
        .value();

    const teams = _.zipWith(names, ratings, (name, rating) => {return {name: name, rating: rating}});

    console.log(teams);
});