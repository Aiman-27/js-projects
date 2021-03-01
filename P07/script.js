//grab DOM elements from HTML

const word = document.getElementById('word');
const wrongLetters=document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const message = document.getElementById('win-lose');
const restartButton = document.getElementById('restart');
const notification = document.getElementById('slider-container');

const hangmanParts =document.querySelectorAll('.hangman-part');

//An array of words to select from
const wordPool = ['javascript','computer','hangman','facebook','youtube','instagram'];

//selecting a word at random from the pool
let selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];

//arrays to clasify the input of the user
const correctLetters = [];
const incorrectLetters = [];

//function to display the word on the screen
function displaySelectedWord(){
    word.innerHTML = `
        ${selectedWord.split('').map(letter => `<span class="letter"> ${correctLetters.includes(letter) ? letter : ""} </span>`) .join('') }`;

    const wordText = word.innerText.replace(/\n/g,'');

    if(wordText === selectedWord) {
        message.innerText = 'You Won!';
        popup.style.display = 'flex';
    }

};

//function to display the sliding notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => { notification.classList.remove('show');},3000); 
}

//function to update incorrect letters
function updateWrongLetters() {
    //update the display for wrong letters
    wrongLetters.innerHTML = `
        ${incorrectLetters.length > 0 ? `<p>Wrong</p>` : ''}
        ${incorrectLetters.map( letter => `<span>${letter}</span>`)}
    `;  

    //display hangman parts on incorrect letter input
    hangmanParts.forEach( (part, index) => {
        const errors = incorrectLetters.length;

        if ( index < errors ) {
            part.style.display = 'block';
        }else {
            part.style.display ='none';
        }
    });
    //show popup if lost
    if(incorrectLetters.lenght === hangmanParts.length) {
        message.innerText = 'You Lost';
        popup.style.display = 'flex';
    }
}



//event handlers
//1. event handler for keyboard button press
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displaySelectedWord();
            }
            else {
                showNotification();
            }
        }else {
            if (!incorrectLetters.includes(letter)) {
                incorrectLetters.push(letter);
                updateWrongLetters();
            }else{
                showNotification();
            }
        }
    }
})

//2. event listener for restart button
restartButton.addEventListener('click', () => {
    //empty arrays
    correctLetters.splice(0);
    incorrectLetters.splice(0);

    //get a new selected word from the pool
    selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];

    displaySelectedWord();

    //clear the wrong etters Div
    updateWrongLetters();

    //hide the popup
    popup.style.display = 'none';
})

displaySelectedWord();
