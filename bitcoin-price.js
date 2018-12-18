/*
* Using coindesk.com to get the current price for bitcoin.
* Price is displayed on a simple HTML page.
* Possible to choose to see the price in Euro, Pound Sterling of US Dollar.
* Made in connection with a course on udemy.com
*/

// Connect to the html page and add info to variables
const btn = document.querySelector('#btn');
const price = document.querySelector('#price');
const msg = document.querySelector('#message');
const currency = document.querySelector('#currency');

// Set a variable for the type of currency chosen by user
let selectedCurrency = 'eur';

// Set up the XLMHttp functionallity
const XHR = new XMLHttpRequest();
const URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';


function getPrice() {
  // Get the current price information based on the currency choice from the user
  XHR.onreadystatechange = () => {
    if (XHR.readyState === 4) {
      if (XHR.status === 200) {
        let data = JSON.parse(XHR.responseText);

        switch (selectedCurrency) {
          case 'eur':
            price.innerHTML = `${data.bpi.EUR.rate}${data.bpi.EUR.symbol}`;
            break;
          case 'usd':
            price.innerHTML = `${data.bpi.USD.rate}${data.bpi.USD.symbol}`;
            break;
          case 'gbp':
            price.innerHTML = `${data.bpi.GBP.rate}${data.bpi.GBP.symbol}`
        }
      } else {
        sendMessage(`Connection failed with status ${XHR.status}`);
      }
    }
  }

  XHR.open('GET', URL);
  XHR.send();
}

// Function to change the currency and re-run the price get
function getCurrency(e) {
  selectedCurrency = e.target.value;
  getPrice();
}

// Function to display an error message on the screen
function sendMessage(text) {
  msg.innerText = text;
}

// Eventlistener for the user to change the currency
currency.addEventListener('change', getCurrency);

// Eventlistener for button to get the current price
btn.addEventListener('click', getPrice);

// Run the getPrice function on load
getPrice();