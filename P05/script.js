//getting dom elements
const main =document.getElementById('main');
const addUserButton =document.getElementById('add-user');
const doubleMoneyButton =document.getElementById('double');
const showMillionairesButton =document.getElementById('show-millionaires');
const sortButton =document.getElementById('sort');
const totalButton =document.getElementById('calculate-total');

//initializing data array
let data = [];

//create initial users
generateRandomUser();
generateRandomUser();
generateRandomUser();

//function to fetch random user from api
//API: random.me/api
async function generateRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}` ,
        worth: Math.round(Math.random()*1000000)
     };

     addData(newUser);


}

//function to double the net worth of each user
function doubleWorth() {
    data = data.map( item => {
        return { ...item, worth: item.worth *2}
    });

    updateDOM();
}

//function to sort the userd by richest users
function sortRichest() {
    data.sort ( ( a, b) => b.worth - a.worth );

    updateDOM();
}

//functio  to calculate total net worth 
function calculateTotalNetworth() {
    const totalWorth = data.reduce(
        (acc, item) => (acc += item.worth), 0
    );

    const TotalNetworthElement = document.createElement('div');
    TotalNetworthElement.innerHTML = `<h3>Total Net Worth: <strong>${formatCurrency(totalWorth)}</strong></h3>`
    main.appendChild(TotalNetworthElement);
}

//add newly generated user into the data array

function addData(newUser){
    data.push(newUser);

    updateDOM();
}

//function to filter the users and only shownmillionaires
function showMillionaires() {
    data = data.filter(
        item => item.worth > 1000000
    );

    updateDOM();
}

//function to update the UI with DOM
function updateDOM(inputData = data) {
    main.innerHTML = '<h2><strong>Name</strong>Net Worth</h2>';
    
    inputData.forEach(item => {
        const element =document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(item.worth)}`;
        main.appendChild(element);
    });

}

//function to format a no as a currency
function formatCurrency(num) {
    return 'PKR ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

//event listeners
// 1. add user event listener
addUserButton.addEventListener('click',generateRandomUser);

// 2. add double money event listener
doubleMoneyButton.addEventListener('click', doubleWorth);


//4. show millionaires event listener
showMillionairesButton.addEventListener('click',showMillionaires);

//3. add sort event listener
sortButton.addEventListener('click', sortRichest);

//5. add calculate total wealth event listener
totalButton.addEventListener('click',calculateTotalNetworth);


