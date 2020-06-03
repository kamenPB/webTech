'use strict';

//grab a form
const form = document.querySelector('#addPlayer');

//grab an input
const inputName = form.querySelector('#inputName');
const inputAge = form.querySelector('#inputAge');


//config your firebase push
const firebaseConfig = {
  apiKey: "AIzaSyAfDJD1TpKyk5dJ_H8xFDqdDoBOGvfz3y4",
  authDomain: "footballindexapp.firebaseapp.com",
  databaseURL: "https://footballindexapp.firebaseio.com",
  projectId: "footballindexapp",
  storageBucket: "footballindexapp.appspot.com",
  messagingSenderId: "873416892473",
  appId: "1:873416892473:web:f83d98128a96eda3a3ede8",
  measurementId: "G-J156R60Q25"
};


//create a functions to push
    function firebasePush(name, age) {


        //prevents from braking
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        //push itself
        var playersRef = firebase.database().ref('players').push().set(
            {
                // not great to do these 1 by 1
                name: name,
                age: age
            }
        );

    }

//push on form submit
    if (form) {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            firebasePush(inputName.value, inputAge.value);

            //shows alert if everything went well.
            return alert('Data Successfully Sent to Realtime Database');
        })
    }
