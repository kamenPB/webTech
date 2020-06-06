// get elements
const prePlayers = document.getElementById("players");
const ulList = document.getElementById("ulList");


// sync
dbRefPlayers.on("value", snap => {
  prePlayers.innerText = JSON.stringify(snap.val(), null, 3);
  jsonData = prePlayers.innerText;
  console.log(jsonData);
});

dbRefPlayers.on("child_added", snap => {
  const li = document.createElement("li");
  li.innerText = "Name: " + snap.val().name + " Age: " + snap.val().age + " Country: " + snap.val().country
    + " Buy Price (£): " + snap.val().buy_price + " Current Price (£): " + snap.val().current_price
    + " Shares: " + snap.val().shares + " Dividends: " + snap.val().dividends;
  li.id = snap.key;
  ulList.appendChild(li);
});

dbRefPlayers.on("child_changed", snap => {
  const liChanged = document.getElementById(snap.key);
  liChanged.innerText = "Name: " + snap.val().name + " Age: " + snap.val().age + " Country: " + snap.val().country
    + " Buy Price (£): " + snap.val().buy_price + " Current Price (£): " + snap.val().current_price
    + " Shares: " + snap.val().shares + " Dividends: " + snap.val().dividends;
});

dbRefPlayers.on("child_removed", snap => {
  const liToRemove = document.getElementById(snap.key);
  liToRemove.remove();
});
