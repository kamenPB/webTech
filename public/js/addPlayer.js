'use strict';

//grab a form
const form = document.querySelector('#addPlayer');

//grab an input
const inputName = form.querySelector('#inputName');
const inputAge = form.querySelector('#inputAge');
var inputCountry = findSelectedOption('#countrySelector');
const inputBuyPrice = form.querySelector('#inputBuyPrice');
const inputCurrentPrice = form.querySelector('#inputCurrentPrice');
const inputShares = form.querySelector('#inputShares');
const inputDividends = form.querySelector('#inputDividends');


//create a functions to push
function firebasePush(name, age, country, buy_price, current_price, shares, dividends) {


    //push itself
    var playersRef = firebase.database().ref('players').push().set(
        {
            // not great to do these 1 by 1
            name: name,
            age: age,
            country: country,
            buy_price: buy_price,
            current_price: current_price,
            shares: shares,
            dividends: dividends
        }
    );

}

//push on form submit
if (form) {
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();

        firebasePush(inputName.value, inputAge.value, inputCountry,
                     inputBuyPrice.value, inputCurrentPrice.value, inputShares.value,
                     inputDividends.value);

        // close dialog
        closeDialog("#addPlayerDiv");

        //shows alert if everything went well.
        return alert('Data Successfully Sent to Realtime Database');
    })
}



function countrySelectionChange(){
  var selectedOption = findSelectedOption('#countrySelector');
  inputCountry = selectedOption;
  //console.log(selectedOption);
  //console.log(inputCountry);
}
