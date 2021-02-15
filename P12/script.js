//getting Dom elements
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings'); 
const settingsForm = document.getElementById('settings-form');
const settingsDifficulty = document.getElementById('difficulty');

//score and Time DOM elements
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');

//Word and text input DOM element
const word = document.getElementById('word');
const text = document.getElementById('text');

//end game container DOM element
const endGameElement = document.getElementById('end-game-container');


//the pool of words for the game
const wordList = ['a','ability','able','about','above','accept','according','account','across','act','action','activity','actually','add','address','administration','admit','adult','affect','after','again','against','age','agency',
]

//initialize variables
//1. initializw word to display
let randomWord;

//2. initialize time
let time = 15;

//3. initialize score
let score = 0;

//4. initialize difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

settingsDifficulty.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

//on page load focus on the text input so user can use
text.focus();

//start the counter of the timer
const timeInterval = setInterval(updateTime, 1000);

//function 
//1. generate a word at random from wordlist
function generateRandomWord() {
    return wordList[ Math.floor(Math.random() * wordList.length)];
}

// 2. function to add the word random word to the DOM
function addWordToDOM() {
    randomWord = generateRandomWord();
    word.innerHTML = randomWord;
}

//3. function to update the score
function updateScore() {
    score++;
    scoreElement.innerHTML = score;
}

//4.function to update the time
function updateTime() {
    //decrement time by 1 sec
    time--;
    //updating DOM time element
    timeElement.innerHTML = `${time}s`;
    //check if time has expired
    if(time === 0) {
        //stop countdown at 0
        clearInterval(timeInterval);
        //end the game by showing the game container
        gameOver();
    }
}

//5.function to end the game
function gameOver() {
    endGameElement.innerHTML = `
        <h1>The clock has run out!</h1>
        <p>Your score is ${score}</p>
        <button onClick = "window.location.reload()">Play Again</button>
    `
    endGameElement.style.display = 'flex';
}

addWordToDOM();

//event listeners
//1. event listeners for text input
text.addEventListener('input', (e) => {
    //get the value from the user input
    const typedText = e.target.value;

    //check if user iput matches random word
    if ( typedText === randomWord ) {
        //display a new word
        addWordToDOM();
        //update the score
        updateScore();

        //clear the input field
        e.target.value = ''
        //add more time to the clock based on difficulty
        if (difficulty = 'easy') {
            time+= 5;
        }
        else if(difficulty = 'easy') {
            time+= 3;
        }
        else {
            time+= 1;
        };
        updateTime();
    } 
});

//2.when clicking the settings button
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
})

//3. when changing the difficulty settings
settingsForm.addEventListener('change', (e) => {
    const difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty);
})