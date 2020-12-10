
function fetch_data(username) {
    $.getJSON('https://api.chess.com/pub/player/{0}/games/archives'.replace('{0}', username), function (A_data) {
        var r = new Array(), j = -1;

        i = A_data.archives.length - 1;
        $.getJSON(A_data.archives[i], function (data) {
            var items = [];
            console.log(i);
            keys = [];
            $.each(data.games, function (key, val) {
                keys.push(key);
            });
            Table = {};
            $.each(keys, function (key) {
                Table[key] = {}
                var theDate = new Date(data.games[key].end_time * 1000);
                theDate.setHours(theDate.getHours() + 5);
                theDate.setMinutes(theDate.getMinutes() + 30);
                Table[key].date = theDate.toGMTString().replace("GMT", "IST");
                Table[key].white = data.games[key].white.username + ' (' + data.games[key].white.rating + ')';
                Table[key].black = data.games[key].black.username + ' (' + data.games[key].black.rating + ')';

                Table[key].result = "W " + data.games[key].white.result + " : B " + data.games[key].black.result;

                Table[key].timecontrol = data.games[key].time_control + ' (' + data.games[key].time_class + ')';
                Table[key].pgn = data.games[key].pgn;
            });
            for (key = keys.length - 1; key >= 0; key--) {
                r[++j] = '<tr><th>';
                r[++j] = Table[key].date
                r[++j] = '</th><td>';
                r[++j] = Table[key].white
                r[++j] = '</td><td>';
                r[++j] = Table[key].black
                r[++j] = '</td><td>';
                r[++j] = Table[key].result
                r[++j] = '</td><td>';
                r[++j] = Table[key].timecontrol
                r[++j] = '</td><td>';
                pgn = data.games[key].pgn;
                pgn = pgn.split('\"').pop();
                pgn = pgn.substring(3);
                if(key==1){
                    console.log(parsePgn(pgn));
                }
                r[++j] = "<button class=\"btn btn-default\" onclick=\"setClipboard(\'{0}\')\" type=\"button\" id=\"copy-button\" data-toggle=\"tooltip\" data-placement=\"button\" title=\"Copy to Clipboard\"> Copy </button>".replace("{0}", pgn);
                r[++j] = '</td></tr>';
            };

            $('#dataTable').append(r.join(''));

        }).then(() => {

            i--;
            r = new Array();

            $.getJSON(A_data.archives[i], function (data) {

                var items = [];
                keys = [];
                console.log(i);

                $.each(data.games, function (key, val) {
                    keys.push(key);
                });
                Table = {};
                $.each(keys, function (key) {
                    Table[key] = {}
                    var theDate = new Date(data.games[key].end_time * 1000);
                    theDate.setHours(theDate.getHours() + 5);
                    theDate.setMinutes(theDate.getMinutes() + 30);
                    Table[key].date = theDate.toGMTString().replace("GMT", "IST");
                    Table[key].white = data.games[key].white.username + ' (' + data.games[key].white.rating + ')';
                    Table[key].black = data.games[key].black.username + ' (' + data.games[key].black.rating + ')';

                    Table[key].result = "W " + data.games[key].white.result + " : B " + data.games[key].black.result;

                    Table[key].timecontrol = data.games[key].time_control + ' (' + data.games[key].time_class + ')';
                    Table[key].pgn = data.games[key].pgn;
                });
                for (key = keys.length - 1; key >= 0; key--) {
                    r[++j] = '<tr><th>';
                    r[++j] = Table[key].date
                    r[++j] = '</th><td>';
                    r[++j] = Table[key].white
                    r[++j] = '</td><td>';
                    r[++j] = Table[key].black
                    r[++j] = '</td><td>';
                    r[++j] = Table[key].result
                    r[++j] = '</td><td>';
                    r[++j] = Table[key].timecontrol
                    r[++j] = '</td><td>';
                    pgn = data.games[key].pgn;
                    pgn = pgn.split('\"').pop();
                    pgn = pgn.substring(3);
                    r[++j] = "<button class=\"btn btn-default\" onclick=\"setClipboard(\'{0}\')\" type=\"button\" id=\"copy-button\" data-toggle=\"tooltip\" data-placement=\"button\" title=\"Copy to Clipboard\"> Copy </button>".replace("{0}", pgn);
                    r[++j] = '</td></tr>';
                };

                $('#dataTable').append(r.join(''));

            });
        });

    });

}
fetch_data("dodiyaparth999");

function setClipboard(value) {
    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

function search_() {
    username = document.getElementById('#uname').value;
    $('#dataTable tr').remove();
    $('#dataTable').append("<tr><th scope=\"col\">Date</th><th scope=\"col\">White</th><th scope=\"col\">Black</th><th scope=\"col\">Result</th><th scope=\"col\">TimeControl</th><th scope=\"col\">PGN</th></tr>");
    fetch_data(username);
}