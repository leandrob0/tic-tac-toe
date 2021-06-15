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
        let boardPosition = e.target.id.split("");

        gameBoard[boardPosition[0]][boardPosition[1]] = Player1.getMark();
        showGameBoard();
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

    return {gameBoard, showGameBoard, addFunctionality};
   
})();

/*
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

    return{checkSpaceAvailable};
});
*/

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
let Player2 = playerFactory("Player 2","");//So i made it a let variable 😧 (yes i used an emoji in code)

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
            console.log(Player1.getMark());
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
