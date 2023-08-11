/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const originalDeck = buildOriginalDeck();
const drawButton = document.getElementById('drawButton');



/*----- state variables  -----*/ 
let shuffledDeck = getNewShuffledDeck();
let results;
let winner;



/*----- cached elements  -----*/
const shuffledContainer =
document.getElementById('shuffled-deck-container');


const pCardEl = document.getElementById('playerCards');
const cCardEl = document.getElementById('computerCards');


const splitPoint = Math.floor(shuffledDeck.length / 2);
const playerCards = shuffledDeck.slice(0, splitPoint);
const computerCards = shuffledDeck.slice(splitPoint);

/*----- event listeners -----*/
drawButton.addEventListener('click', () => {
    playRound();
});

/*----- functions -----*/
function playRound() {
    results.p ='';
    results.c ='';

    if (playerCards.length > 0 && computerCards.length > 0) {
        const playerCard = playerCards.pop();
        const computerCard = computerCards.pop();
    
    if (playerCard.value > computerCard.value) {
        playerCards.unshift(playerCard, computerCard);
        results.p = 'p';
    }  if (computerCard.value > playerCard.value) {
        computerCards.unshift(playerCard, computerCard);
        results.c = 'c';
    } if (playerCard.value === computerCard.value) {
        initiateWar(playerCard, computerCard);
    }

    renderDeckInContainer(playerCard, pCardEl);
    renderDeckInContainer(computerCard, cCardEl);
    renderResults();
    
    }
}

function initiateWar(playerCard, computerCard) {

    const warCards = [playerCard, computerCard]; 
    for (let i = 0; i < 4; i++) {
        console.log(playerCards, computerCards);
       
        if (playerCards.length === 0) {
            results.c = 'c';
            console.log("Player has run out of cards!");
            return;
        }  if (computerCards.length === 0) {
            results.p = 'p';
            console.log("Computer has run out of cards!");
            return;
        }
        const playerWarCard = playerCards.pop();
        const computerWarCard = computerCards.pop();

        warCards.push(playerWarCard, computerWarCard);
    }

    let playerWarValue = warCards[warCards.length - 2].value;
    let computerWarValue = warCards[warCards.length - 1].value;

    if (playerWarValue > computerWarValue) {
        playerCards.unshift(...warCards);
        results.pWar = 'pWar';
    }  if (computerWarValue > playerWarValue) {
        computerCards.unshift(...warCards);
        results.cWar = 'cWar';
    } if (playerCard.value === computerCard.value) {
        
        const newPlayerWar = playerCards.pop();
        const newComputerWar = computerCards.pop();
        
        initiateWar(newPlayerWar, newComputerWar);
    }
    render();

}

function renderDeckInContainer(card, container) {
    container.innerHTML = '';
    const cardsHtml = `<div class="card ${card.face}"></div>`;
    container.innerHTML = cardsHtml;
  }
function getNewShuffledDeck() {
    const tempDeck = [...originalDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
        const rndIdx = Math.floor(Math.random() * tempDeck.length);
        newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
}

function buildOriginalDeck() {
    const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            deck.push({
                face: `${suit}${rank}`,
                value: ranks.indexOf(rank) + 2
        });
        });
    });
    return deck;
}
function renderResults() {
    const resultContainer = document.getElementById('resultContainer');

    if (results.p === 'p') {
        resultContainer.textContent = 'Player wins this round!';
    } else if (results.c === 'c') {
        resultContainer.textContent = 'Computer wins this round!';
    } 
        else if (results.pWar === 'pWar') {
        resultContainer.textContent = "It's a tie! Player wins the war!";
    }
        else if (results.cWar === 'cWar') {
        resultContainer.textContent = "It's a tie! Computer wins the war!";
    }
    console.log(results);

}

function render() {
    renderDeckInContainer(playerCards, pCardEl);
    renderDeckInContainer(computerCards, cCardEl);
    renderResults();


}
function init() {
    shuffledDeck = getNewShuffledDeck();
    playerCards.splice(0, playerCards.length, ...shuffledDeck.slice(0, splitPoint));
    computerCards.splice(0, computerCards.length, ...shuffledDeck.slice(splitPoint));


    results = {
        p: '',
        c: '',
        pWar: '',
        cWar: ''
    };
    render();
}
init();