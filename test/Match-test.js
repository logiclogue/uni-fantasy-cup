const expect = require("chai").expect;
const Team = require("../src/Team");
const Match = require("../src/Match");
const Seed = require("football-score-sim/src/Seed");

describe("Match", () => {
    const bristol = new Team("Bristol", 1368);
    const sheffield = new Team("Sheffield", 1282);
    const seed = "testing".toSeed();

    const match = new Match([bristol, sheffield], seed);

    describe("#toRatings()", () => {
        it("returns the correct ratings", () => {
            const expected = [1368, 1282].toRatings();

            expect(match.toRatings()).to.deep.equal(expected);
        });
    });

    describe("#penaltyShootout", () => {
        it("returns a penalty shootout", () => {
            expect(match.penaltyShootout.record).to.deep.equal([
                [true, true, false, true, true],
                [true, true, true, true, true]
            ]);
        });
    });
});
