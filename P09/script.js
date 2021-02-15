//get DOM elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-plus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');

//Dummy transactions
const dummyTransactions = [
    {id: 1, description: 'Salary', amount: 100000},
    {id: 2, description: 'Electric Bill', amount: -50000},
    {id: 3, description: 'Internet Bill', amount: -10000},
    {id: 4, description: 'Profit', amount: 50000}
];

let transactions = dummyTransactions;

//function to generate an ID 
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

//add a new transaction from the form
function addTransaction(e) {
    e.preventDefault();

    if(description.value.trim() === '' || amount.value.trim() ==='') {
        alert('Please enter a valid description and transaction amount')
    } else {
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value
            };
        
            transactions.push(transaction);

            addTransactionUI(transaction);
            updateSums();

            description.value = '';
            amount.value = '';

    }
}

//function to remove transaction
function deleteTransaction(id) {
    transactions = transactions.filter( transaction => transaction.id != id);
    init();
}

//function to display transactions in transaction history
function addTransactionUI(transaction) {
    // classify if income or expense
    const type = transaction.amount > 0 ? '+' : '-';

    //create DOM element for list item
    const item = document.createElement('li');

    //add class for list item based on type
    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

    item.innerHTML = `
        ${transaction.description}
        <span>${type}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item);
}

//function to uodate the balance, income, and expense summaries
function updateSums() {
    //create array of transaction amount frm transaction array
    const amounts = transactions.map(transaction => transaction.amount);
    
    //calculate total value for balance
    const total = amounts
                    .reduce((acc, amount) => (acc += amount), 0)
                    .toFixed(2);

    //calculate total income
    const income = amounts
                    .filter( amount => amount > 0)
                    .reduce((acc, amount) => (acc += amount), 0)
                    .toFixed(2);

    //calculate total expense
    const expense = amounts
                    .filter( amount => amount < 0)
                    .reduce((acc, amount) => (acc += amount), 0)
                    .toFixed(2);
    
    //update balance in DOM
    balance.innerHTML = `${total} PKR`

    //update income in DOM
    money_plus.innerHTML = `${income} PKR`

    //update expense in DOM
    money_minus.innerHTML = `${expense} PKR`

}

//funtion to initialize the app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionUI);
    updateSums();
}

//event listeners
//1. event listener for form submit
form.addEventListener('submit',addTransaction);

init();
