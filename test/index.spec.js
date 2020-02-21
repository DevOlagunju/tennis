const {
    Player,
    Match
} = require("../public/js/index");
const assert = require("chai").assert;

describe("Match", function () {
    let match = new Match("player 1", "player 2");

    describe("New game", () => {
        it("should create the two players with correct names", () => {
            assert.isDefined(match.players, "players do not exist");
            assert.equal(
                match.players[0].name,
                "player 1",
                "player 1 has the wrong name"
            );
            assert.equal(
                match.players[1].name,
                "player 2",
                "player 2 has the wrong name"
            );
        });

        it("scores should be zero", () => {
            assert.equal(match.players[0].points, "0", "player 1 score isn't zero");
            assert.equal(match.players[1].points, "0", "player 2 score isn't zero");
        });
    });
});