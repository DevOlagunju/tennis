// player class for keeping each player's name and score
class Player {
    // initialize player
    constructor(name) {
        this.name = name;
        this.points = 0;
    }

    // player wins a point
    winPoint() {
        this.points++;
    }

    // player loses a point
    losePoint() {
        this.points--;
    }

    // player wins a game, restart points
    winGame() {
        this.points = 0;
    }

    // player loses a game, restart points
    loseGame() {
        this.points = 0;
    }
}

// match class to hold match information
class Match {
    // initialize match with two players
    constructor(player1, player2) {
        // two players
        this.players = [new Player(player1), new Player(player2)];

        // 0 - no advantage; 1 - advantage first player; 2 - advantage second player; 3 - deuce
        this.advantage = 0;

        // tie-break flag
        this.tieBreak = false;

        //game ended
        this.gameEnded = false;

        // key to points in a game
        this.pointsKey = {
            0: "0",
            1: "15",
            2: "30",
            3: "40"
        };
    }

    // player wins a point
    pointWonBy(pointWinnerName) {
        // get point winner and loser
        let pointWinnerIndex = this.players.findIndex(
            player => player.name === pointWinnerName
        );
        let pointWinner = this.players[pointWinnerIndex];
        let pointLoser = this.players[1 - pointWinnerIndex];

        // tie-break
        if (this.tieBreak) {
            // end of tie break
            if (
                pointWinner.points >= 6 &&
                pointWinner.points - pointLoser.points >= 1
            ) {
                // player wins game
                this.gameEnded = true;
                return;
            }

            // player wins "regular" tie-break point
            pointWinner.winPoint();
            return;
        }

        // "regular" point
        if (pointWinner.points < 3) {
            // player wins point
            pointWinner.winPoint();

            if (pointWinner.points === 3 && pointLoser.points === 3) {
                this.advantage = 3;
                return "Point won by " + pointWinnerName + ", deuce";
            }

            return;
        }

        // reached 40, check for advantages
        if (pointWinner.points === 3) {
            // game won
            if (pointLoser.points < 3) {
                // player wins game, the other one loses
                this.gameEnded = true;
                return;
            }

            // advantage to the point winner
            if (pointLoser.points === 3) {
                // player wins point
                pointWinner.winPoint();
                this.advantage = pointWinnerIndex + 1;
                return;
            }

            // point winner cancels advantage
            pointLoser.losePoint();
            this.advantage = 3;

            return;
        }

        // point winner wins the game after advantage
        this.gameEnded = true;
        return;
    }

    // restart game
    restart() {
        this.players[0].points = this.players[1].points = 0;
        this.tieBreak = false;
        this.gameOver = false;
        this.gameEnded = false;
        this.advantage = 0;
        return;
    }
}

module.exports = {
    Match: Match
};