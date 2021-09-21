const tiles = document.querySelectorAll(".tile");
const board = document.querySelectorAll(".row");
const p1Points = document.getElementById("points--player1");
const p2Points = document.getElementById("points--player2");
const turnIndcator = document.getElementById("indicator--player")
const turnIcon = document.getElementById('icon--turn')
const turnText = document.getElementById('text--turn')
const btnPvP = document.getElementById("btn--PvP");
const btnPvAI = document.getElementById("btn--PvAI")
const btnplayerTurn1 = document.getElementById("btn--playerTurn1")
const btnplayerTurn2 = document.getElementById("btn--playerTurn2")
const btnThemeModern = document.getElementById("btn--modern");
const btnThemeClassic = document.getElementById("btn--classic")
const btnThemeCandy = document.getElementById("btn--candy")
var playerTurn = 1;
var turn = 1;
var vsAI = true;
var AIDelay;


resetBoard();
setGameMode();
addListenerTiles();


function setGameMode(){
    if (btnPvP.classList.contains("btn--active")){
        vsAI = false;
    }
    else if (btnPvAI.classList.contains("btn--active")){
        vsAI = true;
    }
    if (btnplayerTurn1.classList.contains("btn--active")){
        playerTurn = 1;

    }
    else if (btnplayerTurn2.classList.contains("btn--active")){
        playerTurn = 2;
    }
}

function btnModeSelectHandler(event){
    const btn = event.target;
    btn.classList.add("btn--active");

    if (btn.id == "btn--PvAI"){
        btnplayerTurn1.classList.add("btn--active");
        btnPvP.classList.remove("btn--active");
    }
    else if (btn.id == "btn--playerTurn1"){
        btnplayerTurn2.classList.remove("btn--active");
    }
    else if (btn.id == "btn--playerTurn2"){
        btnplayerTurn1.classList.remove("btn--active");
    }
    else if (btn.id == "btn--PvP"){
        btnPvAI.classList.remove("btn--active");
        btnplayerTurn1.classList.remove("btn--active");
        btnplayerTurn2.classList.remove("btn--active");
    }
}

function btnThemeSelectHandler(event){
    var btn = event.target;
    btnThemeModern.classList.remove("btn--active");
    btnThemeClassic.classList.remove("btn--active");
    btnThemeCandy.classList.remove("btn--active");
    btn.classList.add("btn--active");
    if (btn.id == "btn--modern"){
        document.body.classList = "theme--modern";
    }
    if (btn.id == "btn--classic"){
        document.body.classList = "theme--classic";
    }
    if (btn.id == "btn--candy"){
        document.body.classList = "theme--candy";
    }

}


function tileOnClickHandler(event){
    if (!vsAI){
        turnPlayervsPlayer(event);
    }
    else{
        turnPlayervsAI(event);
    }
}

function addListenerTiles(){
    tiles.forEach(tile => {
        tile.addEventListener('click', tileOnClickHandler);
        }
    )
}

function restartBtnHandler(){
    clearTimeout(AIDelay);
    resetBoard();
    setGameMode();
    if(vsAI && playerTurn == 2){
        turnText.textContent = "Computer's turn";
        makeMoveAI();
    }
    addListenerTiles();
}

function playerMakeMove(){
    addListenerTiles();
}

function turnPlayervsPlayer(event){
        //get x and y coord of clicked tile
        var x = parseInt(event.target.id.slice(-1));
        var y = parseInt(event.target.parentElement.id.slice(-1));
    
        //makeMove return true if move is a valid move then move is made.
        if (makeMove([turn, [y,x]])){
            updateBoard();
            updatePoints();
            changeTurn();
        }
        
        if(isGameFinished()){
            findWinner();
        }
    
        //If a player has no valid move. The turn is skipped.
        else if (getAllValidMoves(turn) == 0) {
            alert("No valid move. Turn is skipped.");
            changeTurn();
        }
}

function turnPlayervsAI(event){
    if (turn != playerTurn){
        return;
    }
    //get x and y coord of clicked tile
    var x = parseInt(event.target.id.slice(-1));
    var y = parseInt(event.target.parentElement.id.slice(-1));

    //makeMove return true if move is a valid move then move is made.
    if (makeMove([turn, [y,x]])){
        updateBoard();
        updatePoints();
        changeTurn();  

        if(isGameFinished()){
            findWinner()
        }

        //If AI has no valid move. The turn is skipped.
        else if (getAllValidMoves(turn) == 0) {
            alert("No valid move. Turn is skipped.");
            changeTurn();
        }

        //else AI makes a move
        else{

        //Remove on clicklistener so player cant accidentally make a random move
        tiles.forEach(tile => {
            tile.removeEventListener('click', tileOnClickHandler);
            }
        )
            turnText.textContent = "Computer's turn"
            //Delay so AI doesnt make move instanteneously for smoother user experience
            AIDelay = setTimeout(makeMoveAI, 1500);
            //Readd onclick listener
            setTimeout(addListenerTiles, 1500);
        }
    }
}

//generate random int between 0 and max
//taken from mozilla references
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function makeMoveAI(){
    var possibleMoves = getAllValidMoves(turn);
    var moveAI = possibleMoves[getRandomInt(possibleMoves.length)]
    makeMove([turn, moveAI]);
    updateBoard();
    updatePoints();
    changeTurn();
    turnText.textContent = "Player's turn"

    if(isGameFinished()){
        findWinner()
    }

    //If Player has no valid move. The turn is skipped.
        else if (getAllValidMoves(turn) == 0) {
            alert("No valid move. Turn is skipped.");
            changeTurn();
            setTimeout(makeMoveAI, 1500);
        }
}

function changeTurn(){
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
function findWinner(){
    var player1 = 0;
    var player2 = 0;
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 8; y++) {
            if (boardState[x][y] == 1) {
                player1++;
            }
            else if (boardState[x][y] == 2) {
                    player2++;
            }
        }
    }
    if (player1 > player2){
        alert("Player 1 Wins!");
    }
    else if (player1 < player2){
        alert("Player 2 Wins!");
    }
    else{
        alert("Tied!");
    }
}

