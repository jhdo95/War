/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const originalDeck = buildOriginalDeck();
const drawButton = document.getElementById('drawButton');



/*----- state variables (things to be remembered throughout execution of program can think of like global data.) -----*/ 
let shuffledDeck = getNewShuffledDeck();
let results; // Object key of 'player1', 'computer'
             // Checks whether player1's or computers card is higher. Tie = war.
             
let winner; // String of 'p' if player wins, 'c' if computer wins.



/*----- cached elements  -----*/
const shuffledContainer =
document.getElementById('shuffled-deck-container');


const pCardEl = document.getElementById('playerCards');
const cCardEl = document.getElementById('computerCards');

//split the cards up 26/26 between player1/computer
const splitPoint = Math.floor(shuffledDeck.length / 2);
const playerCards = shuffledDeck.slice(0, splitPoint);
const computerCards = shuffledDeck.slice(splitPoint);

/*----- event listeners -----*/
drawButton.addEventListener('click', () => {
    playRound();
});

/*----- functions -----*/
function playRound() {


    if (playerCards.length > 0 && computerCards.length > 0) {
        const playerCard = playerCards.pop();
        const computerCard = computerCards.pop();

        // Compare the cards and determine winner of the round
    if (playerCard.value > computerCard.value) {
        //Player wins and will add the cards to the player's deck.
        playerCards.unshift(playerCard, computerCard);
        //update results 
        results.p = 'p';
    } else if (computerCard.value > playerCard.value) {
        //computer wins and can add the cards to the computer's deck
        computerCards.unshift(playerCard, computerCard);
        //update results
        results.c = 'c';
    } else {
        // It's a tie, time to go to war!
        initiateWar(playerCard, computerCard);
    }


   
    console.log('playerCard:', playerCard);
    console.log('computerCard:',computerCard);
    console.log('playerCards:', playerCards);
    console.log('computerCards:', computerCards);
    //Update card display
    renderDeckInContainer(playerCard, pCardEl);
    renderDeckInContainer(computerCard, cCardEl);
    renderResults();
    
    }
}

function initiateWar(playerCard, computerCard) {
    const warCards = [playerCard, computerCard]; //Start with cards that caused the war
    // Each player places 4 cards down
    for (let i = 0; i < 4; i++) {
        // Check if any player has run out of cards
        if (playerCards.length === 0) {
            results.c = 'c'; // Computer wins as player is out of cards.
            return;
        } else if (computerCards.length === 0) {
            results.p = 'p';
            return;
        }
        // Flip a card from each player's deck
        const playerWarCard = playerCards.pop();
        const computerWarCard = computerCards.pop();

        // Add the war cards to the array
        warCards.push(playerWarCard, computerWarCard);
    }
    // Compare the final cards after war
    const playerWarValue = warCards[warCards.length - 1].value;
    const computerWarValue = warCards[warCards.length - 2].value;

    if (playerWarValue > computerWarValue) {
        // Player wins the war and takes all the war cards.
        playerCards.unshift(...warCards);
        results.p = 'p';
    } else if (computerWarValue > playerWarValue) {
        // Computer wins the war and takes all the cards.
        computerCards.unshift(...warCards);
        results.c = 'c';
    } else {
        // Another war as the war cards are of the same rank.
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
//shuffle the deck
function getNewShuffledDeck() {
    //Create a copy of the OriginalDeck (leave originalDeck untouched!)
    const tempDeck = [...originalDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
    //Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
}

//Initialize the deck
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
    let resultContainer = document.getElementById('resultContainer');
//Display the results based on 'results'
    if (results.p === 'p') {
        resultContainer.textContent = 'Player wins this round!';
    } else if (results.c === 'c') {
        resultContainer.textContent = 'Computer wins this round!';
    } else {
        resultContainer.textContent = "It's a tie! Time to go to war!";
    }
    
}

function render() {
    renderDeckInContainer(playerCards, pCardEl);
    renderDeckInContainer(computerCards, cCardEl);
    renderResults();


}
function init() {
    shuffledDeck = getNewShuffledDeck(); // Re-Shuffle the deck
    playerCards.splice(0, playerCards.length, ...shuffledDeck.slice(0, splitPoint));
    computerCards.splice(0, computerCards.length, ...shuffledDeck.slice(splitPoint));


    results = {
        p: '',
        c: '',
    };
    render();
}
init();