//get dom elements
//cards container
const cardContainer = document.getElementById('card-container');
//navigation 
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentCard = document.getElementById('current-card');
//add card container
const addCardContainer = document.getElementById('add-card-container');
const addCardBtn = document.getElementById('add-card');
const closeCardBtn = document.getElementById('close-card');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const addNewCardBtn = document.getElementById('add-card-btn');
//clear cards
const clearBtn = document.getElementById('clear-btn');


//track current card
let currentActiveCard = 0;

//collection of card dom elements
const cardElements = [];

// collection of card data
const cardsData = getCardsData();

//functions 
//1. function to create all cards
function createCards() {
    cardsData.forEach( (data, index) => createCard(data, index) );
}

//2. function to read a card 
function createCard(data, index) {
    //create the div for the card
    const card = document.createElement('div');
    //assign the card class
    card.classList.add('card');
    //check for first card and assign active class
    if (index === 0) {
        card.classList.add('active');
    }
    //create the inner html 
    card.innerHTML = `
        <div class="inner-card">
            <div class="card-front">
                <p>${data.question}</p>
            </div>
            <div class="card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;
    //event listener to flip the card on click
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    //add the newly created card to the collection of card dom
    cardElements.push(card);
    //add the card to the dom
    cardContainer.appendChild(card);
    //display the current card / total card value
    updateCurrentCardText();
}

//3 function to show the current card
function updateCurrentCardText() {
    currentCard.innerHTML = `<p>${currentActiveCard +1}/${cardElements.length}</p>`;
}

//4. get card data from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
     return cards === null ? [] : cards;
}

//5. function to save card data to local storage
function saveCardData(cards) {
    //save data to local storage
    localStorage.setItem('cards', JSON.stringify(cards));
    //reload window
    window.location.reload();
}
createCards();

//event listeners
//1. event listeners for next button
nextBtn.addEventListener('click', () => {
    //hide the current card and move to left
    cardElements[currentActiveCard].className ='card left'
    //increment the current active card tracker
    currentActiveCard++;
    //check if last card 
    if (currentActiveCard > cardElements.length - 1) {
        currentActiveCard = cardElements.length -1;
    }
    //display the new card
    cardElements[currentActiveCard].className = 'card active';
    //update the current card number
    updateCurrentCardText();
})

//2. event listeners for previous button
prevBtn.addEventListener('click', () => {
    //hide the current card and move to right
    cardElements[currentActiveCard].className ='card right'
    //increment the current active card tracker
    currentActiveCard--;
    //check if last card 
    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }
    //display the new card
    cardElements[currentActiveCard].className = 'card active';
    //update the current card number
    updateCurrentCardText();
})

//3. event for the addCardBTN
addCardBtn.addEventListener('click', () => {
    addCardContainer.classList.add('show');
})

//4 close the add card btn
closeCardBtn.addEventListener('click', () => {
    addCardContainer.classList.remove('show');
})

//5 event listener for creating a new card
addNewCardBtn.addEventListener('click', () => {
    //get the user inputs from the text field
    const questionInput = question.value;
    const answerInput = answer.value;
    //check to make sure inputs are not null

    if ( questionInput.trim() && answerInput.trim()) {
        //created new objects using the user inputs
        const newCard = { question: questionInput, answer: answerInput}
        // using thenewCard object, create a card element using the create card function
        createCard(newCard);
        //reset form fields
        question.value = '';
        answer.value = '';
        // hide form after submit
        addCardContainer.classList.remove('show');
        // add the new card object to the cardsData array
        cardsData.push(newCard);
        //save data to local storage and reload page
        saveCardData(cardsData);
    }
    
})

//6. event to clear all cards
clearBtn.addEventListener('click', () => {
    //remove data from local storage
    localStorage.clear();
    //clear the card container of all contents
    cardContainer.innerHTML = '';
    //reload the window
    window.location.reload;
    //update the current card number
    currentCard.innerHTML = '<p></p>';
})