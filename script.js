const tiles = document.querySelectorAll(".tile")
const board = document.querySelectorAll(".row")
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
    if (makeMove([turn, [y,x]])){
        updateBoard();
        if (turn == 1){
            turn = 2;
        }
        else{
            turn = 1;
        }
    }
}


