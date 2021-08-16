//recuperation des elements
let rollDice = document.querySelector("#rollDice");
let dice = document.querySelector("#dice");
let imageDice = document.querySelector("#imageDice");
let flechePlayer1 = document.querySelector("#fleche1");
let flechePlayer2 = document.querySelector("#fleche2");
let currentScorePlayer1 = document.querySelector("#currentScore1");
let currentScorePlayer2 = document.querySelector("#currentScore2");
let bgPlayer1 = document.querySelector("#bgPlayer1");
let bgPlayer2 = document.querySelector("#bgPlayer2");
let hold = document.querySelector("#hold");
let scoreTotalPlayer1 = document.querySelector("#scoreTotal1");
let scoreTotalPlayer2 = document.querySelector("#scoreTotal2");
let newGame =document.querySelector("#new");
//initialisation des scores
let scoreCurrent1 = 0;
let scoreCurrent2 = 0;
let scoreTotal1 = 0;
let scoreTotal2 = 0;
let number;
//initialisation des players + design
let playerActif = "player1";
bgPlayer1.classList.add("bg-secondary");
flechePlayer2.style.display = "none";
bgPlayer2.classList.add("bg-light");
//------------------------- Evenements -------------------------------------
//quand on click, l'image du dé change + ajout au current aux players
rollDice.addEventListener("click", ()=> {
    number = Math.floor(Math.random() * 6) + 1; 
    rollDiceFonction(number);
    addCurrent(number);
    deOn(number);
});
//quand on click sur hold le player récupere le current dans le score total et on change de player
hold.addEventListener('click', ()=> {
    if(playerActif === "player1") {
        scoreTotal1 += scoreCurrent1; 
        scoreTotalPlayer1.textContent = scoreTotal1
        scoreCurrent1 = 0;
        currentScorePlayer1.textContent = scoreCurrent1;
        changePlayer();
        display();
        
    } else if (playerActif === "player2") {
        scoreTotal2 += scoreCurrent2 ;
        scoreTotalPlayer2.textContent = scoreTotal2 ;
        scoreCurrent2 = 0;
        currentScorePlayer2.textContent = scoreCurrent2;
        changePlayer();
        display();
    }
    win();
})
//commencer une nouvelle partie
newGame.addEventListener('click', ()=> {
    remiseZero();
    display();
});
//------------------------- Fonctions -------------------------------------
//fonction changement de player
function changePlayer() {
    if(playerActif === "player1") {
       playerActif = "player2"
    } else if (playerActif === "player2") {
        playerActif = "player1"
    }
    display();
}
//affichage suivant les players bg + fleche de selection
function display() {
    if(playerActif === "player1") {
        flechePlayer2.style.display = "none";
        flechePlayer1.style.display = "inline";
        bgPlayer1.classList.replace("bg-light","bg-secondary");
        bgPlayer2.classList.replace("bg-secondary" ,"bg-light");
    } else if (playerActif === "player2") {
        flechePlayer1.style.display = "none";
        flechePlayer2.style.display = "inline";
        bgPlayer2.classList.replace("bg-light","bg-secondary");
        bgPlayer1.classList.replace("bg-secondary" ,"bg-light");    
    }
}
//fonction pour tourner le dé
function rollDiceFonction(number) {
    imageDice.src="./images/" + number + ".png";
};
//function ajoute au current
function addCurrent(number) {
    if(playerActif === "player1") {
        scoreCurrent1 += number;
        currentScorePlayer1.textContent = scoreCurrent1;
    } else if(playerActif === "player2") {
        scoreCurrent2 += number;
        currentScorePlayer2.textContent = scoreCurrent2; 
    }
}
//fonction quand un player gagne
function win() {
    if(scoreTotalPlayer1.textContent >= 20) {
        alert('Le player 1 gagne '  + scoreTotalPlayer1.textContent  + ' / '   +  scoreTotalPlayer2.textContent);
        remiseZero()
        display();
    } else if (scoreTotalPlayer2.textContent >=20) {
        alert('Le player 2 gagne '  + scoreTotalPlayer2.textContent  + ' / '   +  scoreTotalPlayer1.textContent);
        remiseZero()
        display();
    }
}
//function de remise à zero 
function remiseZero() {
    return location.reload();
}
//si le de tombe sur 1
function deOn(number) {
    if(playerActif === "player1" && number === 1) {
        currentScorePlayer1.textContent = 0;
        scoreCurrent1 = 0;
        changePlayer();
    } else if(playerActif === "player2" && number === 1) {
        currentScorePlayer2.textContent = 0;
        scoreCurrent2 = 0;
        changePlayer();    
    }
}