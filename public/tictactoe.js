var board;

$(document).ready(function() {
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
});
