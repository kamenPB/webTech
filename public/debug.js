
if (!firebase.apps.length) {
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
  firebase.initializeApp(firebaseConfig);

  console.log("firebase initialized");
}


// get elements
const prePlayers = document.getElementById("players");
const ulList = document.getElementById("ulList");

// create references
// const dbRefPlayers = firebase.database().ref().child("players");

// sync
dbRefPlayers.on("value", snap => prePlayers.innerText = JSON.stringify(snap.val(), null, 3));
dbRefPlayers.on("child_added", snap => {
  const li = document.createElement("li");
  li.innerText = "Name: " + snap.val().name + " Age: " + snap.val().age + " Country: " + snap.val().country
    + " Buy Price (£): " + snap.val().buy_price + " Current Price (£): " + snap.val().current_price
    + " Shares: " + snap.val().shares;
  li.id = snap.key;
  ulList.appendChild(li);
});

dbRefPlayers.on("child_changed", snap => {
  const liChanged = document.getElementById(snap.key);
  liChanged.innerText = "Name: " + snap.val().name + " Age: " + snap.val().age + " Country: " + snap.val().country
    + " Buy Price (£): " + snap.val().buy_price + " Current Price (£): " + snap.val().current_price
    + " Shares: " + snap.val().shares;
});

dbRefPlayers.on("child_removed", snap => {
  const liToRemove = document.getElementById(snap.key);
  liToRemove.remove();
});
