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
          $(pID).addClass("youngPlayers");
        }
        if(pAge >= thresholdOldAge){
          // jquery to add class oldPlayers
          $(pID).addClass("oldPlayers");
        }

        // ========= VALUE =======================
        pID = "#" + (childSnap.key).toString() + "value";
        if(pValue > getPortfolioValue() * thresholdValueOverbought){
          $(pID).addClass("overboughtPlayer");
        }
        if(pValue > getPortfolioValue() * thresholdValueUnderbought){
          $(pID).addClass("underboughtPlayer");
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
        $(pID).removeClass("youngPlayers");
        $(pID).removeClass("oldPlayers");
        pID = "#" + (childSnap.key).toString() + "value";
        $(pID).removeClass("overboughtPlayer");
        $(pID).removeClass("underboughtPlayer");
      });
    });

  }


}


// helper functions

function getPlayerValue(price, shares){
  return fixed2(price * shares);
}
