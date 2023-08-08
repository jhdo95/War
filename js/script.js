/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

const originalDeck = buildOriginalDeck();
renderDeckInContainer(originalDeck, document.querySelectorAll('card'));

/*----- state variables (things to be remembered throughout execution of program can think of like global data.) -----*/ 
let shuffledDeck; //
let results; // Object key of 'player1', 'computer'
             // Checks whether player1's or computers card is higher. Tie = war.
             
let winner; // String of 'p' if player wins, 'c' if computer wins.


/*----- cached elements  -----*/
const shuffledContainer =
document.getElementById('shuffled-deck-container');

/*----- event listeners -----*/


/*----- functions -----*/
init();
// Initialize all state, then call render();
function init() {
    results = {
        p: '',
        c: '',
    };
    winner = null;
    render();
}

function renderNewShuffledDeck() {
    //Create copy of OG Deck (leeave og untouched)
    shuffledDeck = getNewShuffledDeck();
    renderDeckInContainer(shuffledDeck, shuffledContainer);
}
function renderDeckInContainer(deck, container) {
    container.innerHTML = '';
    //Build cards as a string of HTML
    let cardsHtml = '';
    deck.forEach(function(card) {
        cardsHtml += `<div class="card ${card.face}"></div>`;
    });
    container.innerHTML = cardsHtml;
}
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
function renderResults(); {

    
}

function render() {
   // renderNewShuffledDeck();
    renderResults();


}


//Initialize the deck and shuffle it

//Split the deck between two players

//Play the game until one player runs out of cards
    //When there's a tie go to war! If there's a tie again. War again!


// Determine the winner.
