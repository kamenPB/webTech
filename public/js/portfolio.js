// get elements
const table = document.getElementById("tableAllPlayers");

// generate table data
dbRefPlayers.on("child_added", snap => {
  const tr = document.createElement("tr");

  var data = snap.val();
  var tdName = document.createElement("td");
  tdName.innerText = data.name;
  tr.appendChild(tdName);
  var tdAge = document.createElement("td");
  tdAge.innerText = data.age;
  tr.appendChild(tdAge);
  var tdCountry = document.createElement("td");
  tdCountry.innerText = data.country;
  tr.appendChild(tdCountry);

  tr.id = snap.key;

  // classList not supported in Internet Explorer 9
  // tr.classList.add("dynamicRow");
  // so use jQuery
  $(tr).addClass("dynamicRow");

  table.appendChild(tr);
});

// update on remove
dbRefPlayers.on("child_removed", snap => {
  const trToRemove = document.getElementById(snap.key);
  trToRemove.parentNode.removeChild(trToRemove);
});
