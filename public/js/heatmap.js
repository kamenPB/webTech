function enableHeatmap(){
  // var age = getLowestAge();
  var thresholdAge = 23; // getLowestAge(); for the best option only
  var pID;
  dbRefPlayers.on("value", snap => {
    //console.log(snap.val());
    snap.forEach(childSnap => {
      var pAge = childSnap.val().age;
      if(pAge <= thresholdAge){
        pID = "#" + (childSnap.key).toString() + "age";
        console.log(pID);
        $(pID).addClass("youngPlayers");
      }
    });
  });
  //console.log(age);

}
