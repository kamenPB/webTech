// get elements
const selectPlayerName = document.getElementById("selectPlayerName");
// set default to empty
selectPlayerName.selectedIndex = 0;


// sync
dbRefPlayers.on("child_added", snap => {
  const option = document.createElement("option");
  option.innerText = snap.val().name;
  option.id = snap.key;
  //console.log(option.id);
  selectPlayerName.appendChild(option);
});

// for each player
dbRefPlayers.on("child_changed", snap => {
  const optionChanged = document.getElementById(snap.key);
  optionChanged.innerText = snap.val().name;
});

// for each player
dbRefPlayers.on("child_removed", snap => {
  const optionToRemove = document.getElementById(snap.key);
  optionToRemove.remove();
});



// log name of every child of players
function selectionChange() {
  var selectedOption = findSelectedOption('#selectPlayerName');

  //console.log(selectedOption);
  dbRefPlayers.on("value", snap => {
      snap.forEach(childSnap => {
        var childData = childSnap.val();
        var childKey = childSnap.key;

        if(childData.name == selectedOption){
          //console.log(childData);
          //console.log(childKey);

          generateFields(childData, childKey);

        }
      });
  });
}


function generateFields(data, key) {

  // get the editable div from index and clean it
  const editDiv = document.getElementById("editableDiv");
  editDiv.innerHTML = '';
  const hr = document.createElement("hr");
  editDiv.appendChild(hr);


  for (var prop in data) {
    //console.log(prop);
    if (Object.prototype.hasOwnProperty.call(data, prop)) {

      // create label for a property
      var labelText;
      var inputType;
      var numberStep = 1; // default step is 1
      switch (prop) {
        case "name":
          labelText = "Full name: ";
          inputType = "text";
          break;
        case "age":
          labelText = "Age: ";
          inputType = "number";
          break;
        case "country":
          labelText = "Country: ";
          inputType = "text";
          break;
        case "buy_price":
          labelText = "Buy Price (£): ";
          inputType = "number";
          numberStep = 0.01;
          break;
        case "current_price":
          labelText = "Current Price (£): ";
          inputType = "number";
          numberStep = 0.01;
          break;
        case "shares":
          labelText = "Shares: ";
          inputType = "number";
          break;
        default: labelText = "DEFAULT CASE TRIGGERED";
      }



      // create div with label and textbox with current value in it
      const div = document.createElement("div");
      const label = document.createElement("label")
      label.innerHTML  = labelText;
      div.appendChild(label);

      const input = document.createElement("input");
      input.type = inputType;
      if(inputType == "number"){
        input.step = numberStep;
      }
      input.defaultValue = data[prop];
      input.id = prop;
      div.appendChild(input);

      editDiv.appendChild(div);

      //console.log(prop);
      //console.log(data[prop]);
    }
  }

  // save button to update database
  const save = document.createElement("input");
  save.type = "button";
  save.id = "editDatabaseButton";
  save.value = "Save";
  save.addEventListener("click", function(){
    saveEditedPlayerToDatabase(data, key);
  }, false);
  editDiv.appendChild(hr.cloneNode(true));
  editDiv.appendChild(save);

}


function saveEditedPlayerToDatabase(data, key){

  //console.log(data);

  const dbRefPlayers = firebase.database().ref().child("players");

  // update firebase
  // go through all input types and update them in firebase
  for (var prop in data) {
    // data save as strings
    data[prop] = document.getElementById(prop).value;
  }



  // push updated
  //console.log(data);
  //console.log(key);

  // remove old player
  dbRefPlayers.child(key).remove();
  // push new player (at the bottom)
  dbRefPlayers.push().set(data);
  // change selected element to default
  var defaultOption = document.getElementById("defaultOption");
  defaultOption.selected = true;
  // clear editableDiv
  const editDiv = document.getElementById("editableDiv");
  editDiv.innerHTML = '';


  // close window (maybe add confirmation)
  closeDialog("#editPlayerDiv");
  alert("player saved");
}
