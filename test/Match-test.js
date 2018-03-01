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

    describe("#penaltyShootout", () => {
        it("returns a penalty shootout", () => {
            expect(match.penaltyShootout.record).to.deep.equal([
                [true, true, false, true, true],
                [true, true, true, true, true]
            ]);
        });
    });

    describe("#isExtraTime", () => {
        context("victory after normal time", () => {
            it("returns false", () => {
                const seed = "normal time 1".toSeed();
                const match = new Match(teams, seed);

                expect(match.isExtraTime).to.be.false;
            });
        });

        context("draw after normal time", () => {
            it("returns true", () => {
                const seed = "extra time 4".toSeed();
                const match = new Match(teams, seed);

                expect(match.isExtraTime).to.be.true;
            });
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
            it("returns false", () => {
                const seed = "won".toSeed();
                const match = new Match(teams, seed);

                expect(match.isPenaltyShootout).to.be.false;
            });
        });
    });

    describe("#winner", () => {
        context("Bristol win on penalties", () => {
            it("returns Bristol", () => {
                const seed = "draw 8".toSeed();
                const match = new Match(teams, seed);

                expect(match.winner).to.equal(bristol);
            });
        });
    });
});
