function enableHeatmap(){
  // var age = getLowestAge();
  var thresholdYoungAge = 23; // getLowestAge(); for the best option only
  var thresholdOldAge = 29;
  var pID;
  dbRefPlayers.on("value", snap => {

    snap.forEach(childSnap => {
      var pAge = childSnap.val().age;

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

    });
  });

}
