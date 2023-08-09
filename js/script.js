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

//cCardEl.classList.add('dA');

/*----- event listeners -----*/
drawButton.addEventListener('click', () => {
    playRound();
});

/*----- functions -----*/
function playRound() {
    // Check if there are cards left for both players
    if (playerCards.length > 0 && computerCards.length > 0) {
        const playerCard = playerCards.pop();
        const computerCard = computerCards.pop();

        // Compare the cards and determine winner of the round
    if (playerCard.value > computerCard.value) {
        //Player wins and will add the cards to the player's deck.
        playerCards.unshift(playerCard, computerCard);
        //update results 
        results.p = 'win';
    } else if (computerCard.value > playerCard.value) {
        //computer wins and can add the cards to the computer's deck
        computerCards.unshift(playerCard, computerCard);
        //update results
        results.c = 'win';
    } else {
        // It's a tie, time to go to war!
        intiateWar(playerCard, computerCard);
    }
    render();
    }
}


function renderDeckInContainer(deck, container) {
    container.innerHTML = '';
    // Let's build the cards as a string of HTML
    let cardsHtml = '';
    deck.forEach(function(card) {
      cardsHtml += `<div class="card ${card.face}"></div>`;
    });
    // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
    // const cardsHtml = deck.reduce(function(html, card) {
    //   return html + `<div class="card ${card.face}"></div>`;
    // }, '');
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
//pCardEl.src = 

}

function render() {
   // renderNewShuffledDeck();
    renderResults();


}
function init() {
    results = {
        p: '',
        c: '',
    };
    render();
}


//init();

//Initialize the deck and shuffle it

//Split the deck between two players

//Play the game until one player runs out of cards
//When there's a tie go to war! If there's a tie again. War again!


// Determine the winner.



//split the cards up 26/26 between player1/computer
//Gameplay:
//each player flips a card from the top of their pile.
//check to see who has the higher card.
//whoever has higher card wins the cards on field and it goes in the bottom of their deck.
//if their is no higher card that means there's a tie. War begins!
//each player places 4 more cards down. The last card on top is used to battle.
//if their is another tie. Another war happens.
//winner takes all the cards on the "field".
//This process repeats until One player has all the cards or one player runs out of cards during war.