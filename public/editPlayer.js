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
const selectPlayerName = document.getElementById("selectPlayerName");

// create references
const dbRefPlayers = firebase.database().ref().child("players");

// sync
var numberOfPlayers = 0;
dbRefPlayers.on("child_added", snap => {
  numberOfPlayers++;
  const option = document.createElement("option");
  option.innerText = snap.val().name;
  option.id = snap.key;
  selectPlayerName.appendChild(option);
  if(numberOfPlayers == 4){ // default selection
    option.selected = true;
  } else {
    option.selected = false;
  }
});

dbRefPlayers.on("child_changed", snap => {
  const optionChanged = document.getElementById(snap.key);
  optionChanged.innerText = snap.val().name;
});

dbRefPlayers.on("child_removed", snap => {
  const optionToRemove = document.getElementById(snap.key);
  optionToRemove.remove();
});



// log name of every child of players
function selectionChange() {
  var selectedOption = findSelectedOption();

  //console.log(selectedOption);
  var c = 0;
  dbRefPlayers.on("value", snap => {
      snap.forEach(childSnap => {
        var childData = childSnap.val();
        c++;

        if(childData.name == selectedOption){
          console.log(childData);
          console.log(c);
        }


      });
  });
}
