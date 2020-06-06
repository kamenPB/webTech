// get elements
const table = document.getElementById("tableAllPlayers");

// generate table data
dbRefPlayers.on("child_added", snap => {
  const tr = document.createElement("tr");

  var data = snap.val();
  var playerKey = snap.key;

  var tdName = document.createElement("td");
  tdName.innerText = data.name;
  tr.appendChild(tdName);

  var tdAge = document.createElement("td");
  tdAge.innerText = data.age;
  // set ID to be playerKey concatinated with age so it is unique
  tdAge.id = (playerKey).toString() + "age";
  tr.appendChild(tdAge);

  var tdCountry = document.createElement("td");
  tdCountry.innerText = data.country;
  tr.appendChild(tdCountry);

  var tdShares = document.createElement("td");
  tdShares.innerText = data.shares;
  tr.appendChild(tdShares);

  var tdDividends = document.createElement("td");
  var dividends = fixed2(data.dividends);
  tdDividends.innerText = "£" + dividends;
  tr.appendChild(tdDividends);

  // add a span element inside td + a class if I want to include css for the value and cost
  var tdBuyPrice = document.createElement("td");
  var cost = fixed2(data.buy_price * data.shares);
  tdBuyPrice.innerText = "£" + fixed2(data.buy_price) + " (£" + cost + ")";
  tr.appendChild(tdBuyPrice);

  var tdCurrentPrice = document.createElement("td");
  var value = fixed2(data.current_price * data.shares);
  tdCurrentPrice.innerText = "£" + fixed2(data.current_price) + " (£" + value + ")";
  tr.appendChild(tdCurrentPrice);

  var tdCommission = document.createElement("td");
  var comm = fixed2(value * 0.02);
  tdCommission.innerText = "£" + comm;
  tr.appendChild(tdCommission);

  var tdProfit = document.createElement("td");
  var profit = fixed2(Number(value) + Number(dividends) - Number(cost) - Number(comm));
  tdProfit.id = (playerKey).toString() + "profit";
  tdProfit.innerText = "£" + profit;
  tr.appendChild(tdProfit);

  tr.id = snap.key;

  // classList not supported in Internet Explorer 9
  // tr.classList.add("dynamicRow");
  // so use jQuery
  $(tr).addClass("generatedRow");

  table.appendChild(tr);


  // add appropriate class to tdProfit after row is generated
  var profitID = "#" + tdProfit.id;
  if(profit > 0) {
    $(profitID).addClass("positiveProfit");
  } else {
    $(profitID).addClass("negativeProfit");
  }

});

// update on remove
dbRefPlayers.on("child_removed", snap => {
  const trToRemove = document.getElementById(snap.key);
  trToRemove.parentNode.removeChild(trToRemove);
});


function fixed2(n){
  return (Math.round( n * 100 + Number.EPSILON ) / 100).toFixed(2)
}
