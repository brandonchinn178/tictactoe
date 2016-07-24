// the tic-tac-toe board
var board;
var isX;
var socket = io({
    reconnection: false,
});

$(document).ready(function() {
    socket.on('init', function(status) {
        if (status.isPlaying) {
            setup(status.player);
        } else {
            $("p.status").text("Game is already in session");
        }
    });
    socket.on('start', start);
    socket.on('finish', function(data) {
        socket.disconnect();
        switch(data.result) {
            case "quit":
                break;
            case "won":
                break;
            case "lost":
                break;
        }
    });
});

/**
 * Sets up the game board for the current user,
 * who is playing as the given player number.
 *
 * @param {int} playerNum -- the number of the player
 */
var setup = function(playerNum) {
    isX = playerNum === 1;
    var symbol = isX ? "X" : "O";
    $("p.info").text("You are player: " + symbol);
    $("p.status").text("Waiting for another player...");

    board = $("table#game");
    for (var i = 0; i < 3; i++) {
        var row = $("<tr>");
        for (var j = 0; j < 3; j++) {
            $("<td>")
                .data("coordinates", {
                    x: j,
                    y: i,
                })
                .appendTo(row);
        }
        row.appendTo(board);
    }

    board.find("td").click(function() {
        var coordinates = $(this).data("coordinates");
    });
};

var start = function() {
    $("p.status").text("");
};
