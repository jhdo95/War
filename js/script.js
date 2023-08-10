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
        initiateWar(playerCard, computerCard);
    }
    // const playerCardImagePath = `css/card-library/images/${playerCard.face}.png`;
    // const computerCardImagePath = `css/card-library/images/${computerCard.face}.png`;

    // console.log('Player Card Image Path:', playerCardImagePath);
    // console.log('Computer Card Image Path:', computerCardImagePath);

    // pCardEl.style.backgroundImage = `url(${playerCardImagePath})`;
    // cCardEl.style.backgroundImage = `url(${computerCardImagePath})`;

   
    console.log('playerCard', playerCard)
    //Update card display
    renderDeckInContainer(playerCard, pCardEl);
    renderDeckInContainer(computerCard, cCardEl);
    renderResults();
    }
}

function initiateWar(playerCard, computerCard) {
    //Place additional cards on the "field" and compare the final cards
    //Update results
}

function renderDeckInContainer(card, container) {
    container.innerHTML = '';
    // Let's build the cards as a string of HTML
    // container.classList.add(card.face);
     const cardsHtml = `<div class="card ${card.face}"></div>`;

    // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
    // const cardsHtml = deck.reduce(function(html, card) {
    //   return html + `<div class="card ${card.face}"></div>`;
    // }, '');
    console.log(card, container);
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
    const resultContainer = document.getElementById('resultContainer');
//Display the results based on 'results' and 'winner' variables
    if (results.p === 'win') {
        resultContainer.textContent = 'Player wins this round!';
    } else if (results.c === 'win') {
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


    renderDeckInContainer(playerCards, pCardEl);
    renderDeckInContainer(computerCards, cCardEl);
    renderResults();
}


init();

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