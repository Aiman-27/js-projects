//get DOM elements required
// HTML 5 main element for the grid
const main = document.getElementById('main');
//select box for changing voices
const voiceSelect = document.getElementById('voices');
//toggle button to display custom text inpuy
const toggleBtn = document.getElementById('toggle');
//button to close custom text div
const closeBtn = document.getElementById('close');
// text area for custom text inptu
const customText = document.getElementById('text');
// button to read the custom text input
const readBtn = document.getElementById('read');
//custom text div
const customTextDiv = document.getElementById('custom-text');

// array for holding all images and text to be read
const data = [
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/grandmaa.jpg',
        text: "I want to go to Grandma's House"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/home.jpg',
        text: "I want to go to home"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/outside.jpg',
        text: "I want to go Outside"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/school.jpg',
        text: "I Want to go to School"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    }
]

//array for all web speech API voices
let voicesBackup = [];


// create a box for each object in the data array
data.forEach(createBox);

//functions
//1. function to create speech boxes
function createBox(imageObj) {
    //create empty div for the image to be added to the main grid later
    const box = document.createElement('div');
    // get the source URL and text from the data array
    const { image, text } = imageObj;
    //apply a CSS class to the new div
    box.classList.add('box');
    //Add the iimage inside the box
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="imageInfo">${text}</p>
    `;
    //add event for speaking text
    box.addEventListener('click', () => {
        setMessage(text);
        speakText();
    })

    //add the new box to the DOM
    main.appendChild(box);
}

//initialize speech synthesis
const message = new SpeechSynthesisUtterance();

//2, functio to get voices from web speech API and put into the select box
function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
    return;
    }
  
    let voices = speechSynthesis.getVoices();
    voicesBackup = voices;
  
    for(var i = 0; i < voices.length; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
  
        if(voices[i].default) {
            option.textContent += ' -- DEFAULT';
    }
  
    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
    }
}

//3. set the text for speech synthesis
function setMessage(text) {
    message.text = text;
}

//4. to speak text
function speakText() {
    speechSynthesis.speak(message);
}

//5. function to set the new voice
function setVoice(e) {
    message.voice = voicesBackup.find(voice => voice.name === e.target.value);
}
  
populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
speechSynthesis.onvoiceschanged = populateVoiceList;
}



//event listeners
//1.toggle button
toggleBtn.addEventListener('click', () => {
    customTextDiv.classList.toggle('show');
})

//2. close button in custom text div
closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');
})

//3. event listener when changing voices
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
voiceSelect.addEventListener('change', setVoice);

//4. event for custom text reader
readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})
