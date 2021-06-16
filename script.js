/* 
    Creates the board dynamically to make the html more compact 
*/
function createGrid(event) {
    const gameBoard = document.querySelector("#game-board");
    for(let i = 0; i < 9; i++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add("game-space");

        gameBoard.append(gridElement);
    }
    console.log("grid for the game board added.");
}

createGrid();


//Board ########################################
const myBoard = (function() {
    
    let gameBoard = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    let playerTurn = 1;

    function showGameBoard() {
        const divs = document.querySelectorAll(".game-space");
        let i = 0;
        let j = 0;
        Array.from(divs).forEach(div => {
            if(j == 3) {
                j = 0;
                i++;
            }
            div.textContent = gameBoard[i][j];
            j++;
        });
    }

    //Function that takes care of all the game functionality
    function returnDiv(e) {
        let boardPosition = e.target.id.split("");

        let playerWon = 0;

        if(game.checkSpaceAvailable(boardPosition, gameBoard) == 1){return;}

        //FILLS THE ARRAY
        if(playerTurn == 1) {
            gameBoard[boardPosition[0]][boardPosition[1]] = Player1.getMark();
            playerTurn = 2;
        } else {
            gameBoard[boardPosition[0]][boardPosition[1]] = Player2.getMark();
            playerTurn = 1;
        }

        showGameBoard();

        (game.checkWinner(gameBoard) == 1) ? playerWon = 1 : 
        (game.checkWinner(gameBoard) == 2) ? playerWon = 2 : playerWon = 0;
        
        if(game.announceWinner(playerWon) === true) {
            removeFunctionality();
        }

        if(game.checkIfFull(gameBoard) == 1 && (playerWon !== 1 || playerWon !== 2)) {
            console.log("draw");
            removeFunctionality();
        }
    }

    function addFunctionality() {
        const divs = document.querySelectorAll(".game-space");
        let arrayDivs = Array.from(divs);
        let k = 0;
        for(let i = 0; i < 3 ; i++) {
            for(let j = 0; j < 3; j++) {
                arrayDivs[k].setAttribute("id",i.toString() + j.toString());
                k++;
            }
        }
        arrayDivs.forEach(div => div.addEventListener("click", returnDiv));
    }

    function removeFunctionality() {
        const divs = document.querySelectorAll(".game-space");
        let arrayDivs = Array.from(divs);
        arrayDivs.forEach(div => div.removeEventListener("click", returnDiv));
    }

    return {gameBoard, showGameBoard, addFunctionality};
   
})();




//Game flow #########################################
const game = (function() {

    function checkIfFull(board) {
        let check = true;
        let returned;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j] == "") {
                    check = false;
                } 
            }
        }
        check ? returned = 1 : returned = 0;

        return returned;
    } 

    function checkWinner(board) {
        let arrayResult = [];

        //match diagonal
        for(let i = 0; i < 3; i++) {
            arrayResult.push(board[i][i]);
        }
        const allEqual = arr => arr.every(v => v === arr[0] && v !== "");
        if(allEqual(arrayResult)) {
            if(arrayResult[0] == Player1.getMark) {
                return 1;
            } else {
                return 2;
            }
        }

        arrayResult = [];

        //match reverse diagonal
        let counter = 2;
        for(let i = 0; i < 3; i++) {
            arrayResult.push(board[i][counter]);
            counter--;
        }
        if(allEqual(arrayResult)) {
            if(arrayResult[0] == Player1.getMark) {
                return 1;
            } else {
                return 2;
            }
        }

        arrayResult = [];

        //match vertical line
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                arrayResult.push(board[j][i]);
            }
            if(allEqual(arrayResult)) {
                if(arrayResult[0] == Player1.getMark()) {
                    return 1;
                } else if(arrayResult[0] == Player2.getMark()){
                    return 2;
                }
            }
            arrayResult = [];
        }

        //match horizontal line
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                arrayResult.push(board[i][j]);
            }
            if(allEqual(arrayResult)) {
                if(arrayResult[0] == Player1.getMark()) {
                    return 1;
                } else if(arrayResult[0] == Player2.getMark()){
                    return 2;
                }
            }
            arrayResult = [];
        }
    }

    function announceWinner(value) {
        if(value == 1) {
            console.log("Player 1 won");
            return true;
        } else if(value == 2) {
            console.log("Player 2 won");
            return true;
        }

        return false;
    }

    function checkSpaceAvailable(position,board) {
        if(board[position[0]][position[1]] != "") {
            return 1;
        }
    }

    return {announceWinner, checkWinner, checkIfFull, checkSpaceAvailable};
})();



//Player object ########################################
const playerFactory = (name, mark) => {
    this.mark = mark;
    this.name = name;
    const getName  = () => name;
    const getMark = () => mark;

    return {getName , getMark};
};


myBoard.showGameBoard();

let Player1 = playerFactory("Player 1",""); //I couldn't figure out how to update the mark value when this is a const from the factory function.
let Player2 = playerFactory("Player 2","");//So i made it a let variable so i can change it later 😧 (yes i used an emoji in code)



/*
    ################################################

        THE LOGIC FOR WHEN THE GAMES START.

    ################################################
*/
function getRadioValues() {
    var getMarkPlayer2 = document.querySelector('input[name="radioMark"]:checked');
    var getMarkPlayer1 = document.querySelector('input[name="radioMark1"]:checked');   
        
    if(getMarkPlayer1 != null && getMarkPlayer2 != null) {   
        if(getMarkPlayer1.value != getMarkPlayer2.value) {
            Player1 = playerFactory("Player 1", getMarkPlayer1.value);
            Player2 = playerFactory("Player 2", getMarkPlayer2.value);
        } else {
            alert("The selected mark are the same for both players");
        }
    }   
    else {   
        alert("Error.");  
    }   
}

function disableInputs() {
    var getInputsP2 = document.querySelectorAll('input[name="radioMark"]');
    var getInputsP1 = document.querySelectorAll('input[name="radioMark1"]'); 

    Array.from(getInputsP2).forEach(element => element.disabled = true);
    Array.from(getInputsP1).forEach(element => element.disabled = true);
}

const startGame = document.querySelector("#start-button");
startGame.addEventListener("click", getRadioValues);
startGame.addEventListener("click", disableInputs);
startGame.addEventListener("click", myBoard.addFunctionality());
