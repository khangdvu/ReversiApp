const tiles = document.querySelectorAll(".tile");
const board = document.querySelectorAll(".row");
const p1Points = document.getElementById("points--player1");
const p2Points = document.getElementById("points--player2");
const turnIndcator = document.getElementById("indicator--player")
const turnIcon = document.getElementById('icon--turn')
var turn = 1;

resetBoard();

tiles.forEach( tile => {
    tile.addEventListener('click', tileOnClickHandler);
}

)
function tileOnClickHandler(event){
    //get x and y coord of clicked tile
    var x = parseInt(event.target.id.slice(-1));
    var y = parseInt(event.target.parentElement.id.slice(-1));
    //makeMove return true if move is a valid move then move is made.
    if (makeMove([turn, [y,x]])){
        updateBoard();
        updatePoints();
        if (turn == 1){
            turn = 2;
            turnIcon.classList.remove("player1");
            turnIcon.classList.add("player2");
        }
        else{
            turn = 1;
            turnIcon.classList.remove("player2");
            turnIcon.classList.add("player1");
        }
    }
}


