// ============= PORTFOLIO =========================

// Add a player dialog
$(function(){
  $("#showAddPlayerDialog").click(function(){
    $("#addPlayerDiv").removeClass("hidden");
    $("#addPlayerDiv").dialog({
      id: "addPlayerDialog",
      width: 'auto',
      height: 'auto'
    });
  });
});


// Edit a player dialog
$(function(){
  $("#showEditPlayerDialog").click(function() {
    $("#editPlayerDiv").removeClass("hidden");
    $("#editPlayerDiv").dialog({
      id: "editPlayerDialog",
      width: 'auto',
      height: 'auto'
    });
  });
});


// find selected option in player edit dialog
function findSelectedOption(id){
  return $(id).val();
}


// close a dialog by its ID
function closeDialog(dialogID){
  $(dialogID).dialog("close");
}

// remove a class
function removeClass(id, classr){
  $(id).removeClass(classr);
}

// add a class
function addClass(id, classa){
  $(id).addClass(classa);
}



// initialize country selector when adding players
$("#countrySelector").countrySelector();



// ===================== INDEX ======================
