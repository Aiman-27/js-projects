//getting elements by dom
const currOnePicker = document.getElementById('currency-one');
const currTwoPicker = document.getElementById('currency-two');
const currOneAmount = document.getElementById('amount-one');
const currTwoAmount = document.getElementById('amount-two');
const flipButton = document.getElementById('flip');
const rate = document.getElementById('rate');


//fetch exchange rates from 3rd party API and update DOM
function calculate() {
    const currencyOneCode = currOnePicker.value;
    const currencyTwoCode = currTwoPicker.value;

    fetch(`https://v6.exchangerate-api.com/v6/a43d02c063c1303f1c06c071/latest/${currencyOneCode}`)
        .then( res => res.json() )
        .then( data => {
            //get the exchange rate from API data 
            console.log(currencyTwoCode);
            const exchangeRate = data.conversion_rates[currencyTwoCode];
            
            console.log(exchangeRate);
            
            //display the conversion rates
            rate.innerText = `1 ${currencyOneCode} = ${exchangeRate} ${currencyTwoCode}`;

            //apply conversion rate and update amount of currency two
            currTwoAmount.value = (currOneAmount.value * exchangeRate).toFixed(2);


        });

}

//flip function for the flip button to reverse currency 
function flip() {
    const temp = currOnePicker.value;
    currOnePicker.value = currTwoPicker.value;
    currTwoPicker.value = temp;
    calculate();
}

//event listeners
currOnePicker.addEventListener('change', calculate);
currTwoPicker.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate);
currTwoAmount.addEventListener('input', calculate);
flipButton.addEventListener('click',flip);



calculate();