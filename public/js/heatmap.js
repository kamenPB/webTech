function enableHeatmap(){
  // var age = getLowestAge();
  var thresholdAge = 23; // getLowestAge(); for the best option only
  var pID;
  dbRefPlayers.on("value", snap => {

    snap.forEach(childSnap => {
      var pAge = childSnap.val().age;
      if(pAge <= thresholdAge){

        // reconstruct the ID of the player found
        pID = "#" + (childSnap.key).toString() + "age";

        // jquery to add class youngPlayers
        $(pID).addClass("youngPlayers");
      }
    });
  });

}
