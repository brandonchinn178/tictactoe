/**
 * The game being run on the server
 */
var Game = function() {
    this.player1 = null;
    this.player2 = null;
};

/**
 * @return True if the game has two players playing
 */
Game.prototype.isRunning = function() {
    return this.player1 !== null && this.player2 !== null;
};

/**
 * Add the given player to the game. Will also send back data
 * on the 'init' channel related to the player's status:
 *  {
 *      isPlaying: true | false,
 *      player: 1 | 2, // if isPlaying
 *  }
 *
 * @param {Socket} player -- the player to add
 */
Game.prototype.addPlayer = function(player) {
    var status = {
        isPlaying: !this.isRunning(),
    };
    if (this.player1 === null) {
        this.player1 = player;
        status.player = 1;
    } else if (this.player2 === null) {
        this.player2 = player;
        status.player = 2;
    }
    player.emit('init', status);
    // start game
    if (this.player2 !== null) {
        this.player1.emit('start');
        this.player2.emit('start');
    }
};

/**
 * Removes the given player from the game. The other player will
 * receive a notification on the 'finish' channel with "result" set
 * to "quit"
 */
Game.prototype.removePlayer = function(player) {
    var data = {
        result: "quit",
    };
    if (player === this.player1 && this.player2 !== null) {
        this.player2.emit('finish', data);
    } else if (player === this.player2 && this.player1 !== null) {
        this.player1.emit('finish', data);
    }
    this.player1 = null;
    this.player2 = null;
};

module.exports = new Game();
