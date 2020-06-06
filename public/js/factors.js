var toggle = false;

function toggleFactors(){

  if(!toggle){
    toggle = true;

    var thresholdYoungAge = 23; // getLowestAge(); for the best option only
    var thresholdOldAge = 29;
    var thresholdValueOverbought = 0.10; // 10%
    var thresholdValueUnderbought = 0.01; // 1%
    var pID;

    dbRefPlayers.on("value", snap => {

      snap.forEach(childSnap => {
        var pAge = childSnap.val().age;
        var pShares = childSnap.val().shares;
        var pBuyPrice = childSnap.val().buy_price;
        var pValue = getPlayerValue(pBuyPrice, pShares);

        // ======= AGE ======================
        // reconstruct the ID of the player found
        pID = "#" + (childSnap.key).toString() + "age";

        if(pAge <= thresholdYoungAge){
          // jquery to add class youngPlayers
          addClass(pID, "youngPlayers");
        }
        if(pAge >= thresholdOldAge){
          // jquery to add class oldPlayers
          addClass(pID, "oldPlayers");
        }

        // ========= VALUE =======================
        pID = "#" + (childSnap.key).toString() + "value";
        if(pValue > getPortfolioValue() * thresholdValueOverbought){
          addClass(pID, "overboughtPlayer");
        }
        if(pValue > getPortfolioValue() * thresholdValueUnderbought){
          addClass(pID, "underboughtPlayer");
        }

      });

      //console.log(getPortfolioValue());
      //console.log(getPortfolioCost());

      // generate report
      // TODO

    });

  } else {
    toggle = false;

    // disable all heatmap classes;
    dbRefPlayers.on("value", snap => {
      snap.forEach(childSnap => {

        var pID = "#" + (childSnap.key).toString() + "age";
        // jQuery
        removeClass(pID, "youngPlayers");
        removeClass(pID, "oldPlayers");
        pID = "#" + (childSnap.key).toString() + "value";
        removeClass(pID, "overboughtPlayer");
        removeClass(pID, "underboughtPlayer");
      });
    });

  }


}


// helper functions

function getPlayerValue(price, shares){
  return fixed2(price * shares);
}
