var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var gameWidth = 1200, gameHeight = 600;
var startTime, endTime;

canvas.width = gameWidth;
canvas.height = gameHeight;

var controllers = {
	"a": function () { actions.run(players[0], 1) },
	"q": function () { actions.run(players[0], 0) },
	"f": function () { actions.run(players[1], 1) },
	"g": function () { actions.run(players[1], 0) },
	"n": function () { actions.run(players[2], 1) },
	"m": function () { actions.run(players[2], 0) },
	"o": function () { actions.run(players[3], 1) },
	"p": function () { actions.run(players[3], 0) }
}

var actions = {
	"run": function (player, direction) {
		var order = players.map(function(e){ return (e.posX / gameWidth) * 100 }).sort((a,b) => a < b ? true : false);
		var offset =  order[0] - (player.posX / gameWidth) * 100;
		var speed = 10 + (offset / 10);
		
		console.log(offset);
		console.log(speed);

		if (player.runState == direction) {
			player.posX = player.posX + speed;
			player.runState = !player.runState;
		}
	}
}

var players = [
	{ name: "Player 1", images: [document.getElementById("p1_1"), document.getElementById("p1_2")], runState: 0, posX: 0, posY: 0 },
	{ name: "Player 2", images: [document.getElementById("p2_1"), document.getElementById("p2_2")], runState: 0, posX: 0, posY: 150 },
	{ name: "Player 3", images: [document.getElementById("p3_1"), document.getElementById("p3_2")], runState: 0, posX: 0, posY: 300 },
	{ name: "Player 4", images: [document.getElementById("p4_1"), document.getElementById("p4_2")], runState: 0, posX: 0, posY: 450 }
]

var runGame = function runGame(e) {
	var key = e.key;
	var action = controllers[key];

	typeof action == "function" ? action() : false;
	drawPlayers(players);
}

var drawPlayers = function drawPlayers(players) {
	ctx.clearRect(0, 0, gameWidth, gameHeight);

	players.forEach(function (player) {
		ctx.drawImage(player.images[+player.runState], player.posX, player.posY);

		if (player.posX > gameWidth - 80) {
			endTime = new Date();
			alert(player.name + " wins in " + (endTime - startTime) / 1000 + " seconds!");
			document.removeEventListener("keyup", runGame);
		}
	})

}


var countDown = function countDown(number, callback) {
	var count = number;
	var interval = setInterval(function () {
		var text;
		if (count == 0) {
			text = "GO!";
			callback();
		} else if (count < 0) {
			text = "";
			clearInterval(interval);
		} else {
			text = count;
		}

		ctx.clearRect((gameWidth / 2 - 40), (gameHeight / 2 - 40), 100, 100);
		ctx.font = "30px Arial";
		ctx.fillText(text, (gameWidth / 2), (gameHeight / 2));

		count--;
	}, 1000);
}

var reset = function reset() {
	players.forEach(function (player) {
		player.posX = 0;
		player.runState = 0;
	})

	drawPlayers(players);
}

var start = function start() {
	reset();

	countDown(5, function () {
		startTime = new Date();
		document.addEventListener("keyup", runGame);
	});
}

drawPlayers(players);