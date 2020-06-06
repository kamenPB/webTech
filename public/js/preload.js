// disable form resubmittion warning alert on browser refresh
if ( window.history.replaceState ) {
 window.history.replaceState( null, null, window.location.href );
}

// configure firebase
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

// initialize firebase
firebase.initializeApp(getFirebaseConfig());

// global reference to all players
const dbRefPlayers = firebase.database().ref().child("players");

// helper functions
function fixed2(n){
  return (Math.round( n * 100 + Number.EPSILON ) / 100).toFixed(2);
}

// getters
function getFirebaseConfig(){
    return firebaseConfig;
}

function getLowestAge(){
  var lowestAge = 100; // some high number
  dbRefPlayers.on("value", snap => {
    //console.log(snap.val());
    snap.forEach(childSnap => {
      var playerAge = childSnap.val().age;
      if(playerAge < lowestAge){
        lowestAge = playerAge;
      }
    });
  });
  return lowestAge;
}

function getPortfolioValue(){
  var value = 0;
  dbRefPlayers.on("value", snap => {
    snap.forEach(childSnap => {
      var pValue = fixed2((childSnap.val().current_price) * childSnap.val().shares);
      value += Number(pValue);
    });
  });
  return value;
}

function getPortfolioCost(){
  var cost = 0;
  dbRefPlayers.on("value", snap => {
    snap.forEach(childSnap => {
      var pCost = fixed2((childSnap.val().buy_price) * childSnap.val().shares);
      cost += Number(pCost);
    });
  });
  return cost;
}
