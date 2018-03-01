const expect = require("chai").expect;
const Team = require("../src/Team");
const Match = require("../src/Match");
const Seed = require("football-score-sim/src/Seed");

describe("Match", () => {
    const bristol = new Team("Bristol", 1368);
    const sheffield = new Team("Sheffield", 1282);
    const teams = [bristol, sheffield];
    const seed = "testing".toSeed();

    const match = new Match(teams, seed);

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

    describe("#isPenaltyShootout", () => {
        context("draw after extra time", () => {
            it("returns true", () => {
                const seed = "draw 8".toSeed();
                const match = new Match(teams, seed);

                expect(match.isPenaltyShootout).to.be.true;
            });
        });

        context("match won in play", () => {
            it("return false", () => {
                const seed = "won".toSeed();
                const match = new Match(teams, seed);

                expect(match.isPenaltyShootout).to.be.false;
            });
        });
    });
});
