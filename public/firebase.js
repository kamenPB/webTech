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

function getFirebaseConfig(){
    return firebaseConfig;
}

firebase.initializeApp(getFirebaseConfig());

const dbRefPlayers = firebase.database().ref().child("players");
