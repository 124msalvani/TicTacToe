// import JSConfetti from 'js-confetti';
const canvas = document.querySelector('#confetti');
const jsConfetti = new JSConfetti();

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let options = ["","","","","","","","","",];
let currentPlayer = "X";
let running = false;

initalizeGame();

document.getElementById("darkmode").addEventListener('click', darkmodeToggle);
function darkmodeToggle() {
    var element = document.body;
    element.classList.toggle("dark-mode");
 }


function initalizeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", startAnimation);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex")

    if(options[cellIndex] != "" || !running){
        return
    }

    updateCell(this, cellIndex)
    checkWinner();
}

var sound1 = new Audio();
sound1.src = "sounds/mixkit-arcade-game-jump-coin-216.wav";
var sound2 = new Audio();
sound2.src = "sounds/mixkit-arrow-whoosh-1491.wav";
var sound3 = new Audio();
sound3.src = "sounds/mixkit-happy-party-horn-sound-530.wav";
var sound4 = new Audio();
sound4.src = "sounds/mixkit-sad-game-over-trombone-471.wav";


function updateCell(cell,index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (currentPlayer == "X"){
        sound1.play();
        return;
    } else if (currentPlayer == "O") {
        sound2.play();
        return;
    } else {
        return
    }
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        confettiWin();
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        sound4.play();
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

var btn = document.querySelector(".button")
function startAnimation(){

    btn.classList.add("line");
    btn.innerHTML = ""
    
    setTimeout(() => {
        btn.classList.remove("line");
        btn.classList.add("circle");
        btn.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        restartGame();
    },1000);

    setTimeout(() => {
        btn.classList.remove("circle");
        btn.innerHTML = 'Restart';

    },2000);
    
}

function confettiWin(){
    jsConfetti.addConfetti();
    sound3.play();
}