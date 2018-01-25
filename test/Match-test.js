const expect = require("chai").expect;
const Team = require("../src/Team");
const Match = require("../src/Match");

describe("Match", () => {
    const bristol = new Team("Bristol", 1368);
    const sheffield = new Team("Sheffield", 1282);

    const match = new Match(bristol, sheffield);

    describe("#toRatings()", () => {
        it("returns the correct ratings", () => {
            const expected = [1368, 1282].toRatings();

            expect(match.toRatings()).to.deep.equal(expected);
        });
    });
});
