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
        ["X","O","X"],
        ["X","O","X"],
        ["O","X","O"]
    ];

    function showGameBoard() {
        const divs = document.querySelectorAll(".game-space");
        let i = 0;
        let j = 0;
        console.log(Array.from(divs));
        Array.from(divs).forEach(div => {
            if(j == 3) {
                j = 0;
                i++;
            }
            div.textContent = gameBoard[i][j];
            j++;
        });
    }

    function returnDiv(e) {
        console.log(e.target);
        return e.target;
    }

    function addFunctionality() {
        const divs = document.querySelectorAll(".game-space");
        Array.from(divs).forEach(div => div.addEventListener("click", returnDiv));
    }

    return {gameBoard, showGameBoard};
   
})();

//CONTROLS THE GAME FLOW ########################################
const controlTheGame = (function() {
    function checkWinner(board) {
        myBoard.gameBoard; // se lo paso por parametro.
    } 

    function checkSpaceAvailable(position,board) {
        if(position < 3) {
            if(board[0][position] == "") {
                return 1;
            } else {
                return 0;
            }
        } else if(position > 2 && position < 6) {
            if(board[1][position - 3] == "") {
                return 1;
            } else {
                return 0;
            }
        } else if(position > 5) {
            if(board[2][position - 6] == "") {
                return 1;
            } else {
                return 0;
            }
        }
    }
})

//Player object ########################################
const playerFactory = (name, mark) => {
    const getName  = () => name;
    const getMark = () => mark;

    return {getName , getMark};
};

myBoard.showGameBoard();
  
const Player1 = playerFactory("Player 1", "X");

//EVENT LISTENER FOR THE MARK SELECTION
const marksButtons = document.querySelectorAll(".player-mark");
let arrayButtons = Array.from(marksButtons);