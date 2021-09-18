var boardState;

//0 = empty tile
//1 = black tile/player
//2 = white tile/player
function resetBoard(){
    boardState = new Array(8);
    for (var i = 0; i < 8; i++){
        boardState[i] = new Array(8);
    }

    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){
            boardState[i][j] = 0;
        }
    }
    boardState[3][3] = 1;
	boardState[4][3] = 2;
	boardState[4][4] = 1;
	boardState[3][4] = 2;
    updateBoard();
}

function updateBoard(){
    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 8; j++){
            board[i].children[j].classList.remove('white');
            board[i].children[j].classList.remove('black');
            if(boardState[i][j] == 1){
                board[i].children[j].classList.add('black');
            }
            if(boardState[i][j] == 2){
                board[i].children[j].classList.add('white');
            }
        }
    }
}

function getAllValidMoves(player){
    var possibleMoves = [];
    for (var x = 0; x < 8; x++) {
		for (var y = 0; y < 8; y++) {
			var move = [x,y];
			if (isValidMove(player, move)) {                
				possibleMoves.push(move);
			}
		}
	}
    return possibleMoves;
}

function isValidMove(player, move){
    var xCoordinates = [ -1,  0,  1, -1, 1, -1, 0, 1 ];
    var yCoordinates = [ -1, -1, -1,  0, 0,  1, 1, 1 ];

    var otherPlayer;
	if (player == 1) {
		otherPlayer = 2;
	}
	else {
		otherPlayer = 1;
	}

    if (boardState[move[0]][move[1]] != 0) {
		return false;
	}

    var turnedTiles = 0;
	var possible_turnedTiles;

	for (var i = 0; i < 8; i++) {
        
		var x = move[0] + xCoordinates[i];
		var y = move[1] + yCoordinates[i];
		possible_turnedTiles = 0;
		while (x >= 0 && x < 8 && y >= 0 && y < 8 && boardState[x][y] == otherPlayer) {
			possible_turnedTiles++;
			x += xCoordinates[i];
			y += yCoordinates[i];
		}
		if (x >= 0 && x < 8 && y >= 0 && y < 8 && boardState[x][y] == player) {
			turnedTiles += possible_turnedTiles;
		}
	}
    if (turnedTiles == 0) {
		return false;
	}
	else {
		return true;
	}        
}

function isGameFinished(){
    if (getAllValidMoves(1).length == 0 && getAllValidMoves(2).length == 0 ) {
		return true;
	}
	return false;
}

function makeMove(params){
    var player = params[0];
    var move = params[1];

    if (!(isValidMove(player, move))) {
        console.log(move[0],move[1])
		return false;
	}

    boardState[move[0]][move[1]] = player;


    var xCoordinates = [ -1,  0,  1, -1, 1, -1, 0, 1 ];
    var yCoordinates = [ -1, -1, -1,  0, 0,  1, 1, 1 ];

    var otherPlayer;
	if (player == 1) {
		otherPlayer = 2;
	}
	else {
		otherPlayer = 1;
	}

	var possibleTiles = [];

    for (var i = 0; i < 8; i++) {
		var x = move[0] + xCoordinates[i];
		var y = move[1] + yCoordinates[i];
		possibleTiles = [];
		while (x >= 0 && x < 8 && y >= 0 && y < 8 && boardState[x][y] == otherPlayer) {
            possibleTiles.push([x,y]);
			x += xCoordinates[i];
			y += yCoordinates[i];
		}
		if (x >= 0 && x < 8 && y >= 0 && y < 8 && boardState[x][y] == player) {
			for (pair of possibleTiles) {
				boardState[pair[0]][pair[1]] = player;
			}
		}
	}
	return true;
}