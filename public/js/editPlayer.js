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
        case "dividends":
          labelText = "Dividends: ";
          inputType = "number";
          numberStep = 0.01;
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
      input.defaultValue = data[prop];
      if(inputType == "number" && prop != "shares" && prop != "age"){
        input.step = numberStep;
        input.defaultValue = fixed2(data[prop]);
      }

      input.id = prop;
      div.appendChild(input);

      editDiv.appendChild(div);

      // add an onclick event to ctrl+a
      document.getElementById(input.id).onclick = function(){input.select()};

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

  // perform data checks here
  //console.log(data);
  var errorText = "";
  for (var prop in data) {
    if (prop == "age" || prop == "shares") {
      var postiveInt = Number(document.getElementById(prop).value);
      if(postiveInt < 1 || !Number.isInteger(postiveInt)) {
        errorText += "\n wrong " + prop + " input;";
      }
    }
    if (prop == "buy_price" || prop == "dividends" || prop == "current_price") {
      var price = Number(document.getElementById(prop).value);
      if(price < 0 || countDecimals(price) > 2) {
        errorText += "\n wrong " + prop + " input";
      }
    }
    if (prop == "name" || prop == "country") {
      var string = document.getElementById(prop).value;
      if(string == "") { // add other conditions
        errorText += "\n wrong " + prop + " input";
      }
    }
  }

  if(errorText != "") {
    alert(errorText);
    return;
  }

  // update firebase
  // go through all input types and update them in firebase
  for (var prop in data) {

    // data save as strings
    data[prop] = document.getElementById(prop).value;
  }


  // bad
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



function countDecimals(value) {
  if (Math.floor(value) !== value)
      return value.toString().split(".")[1].length || 0;
  return 0;
}
