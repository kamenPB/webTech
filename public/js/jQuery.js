// ============= INDEX =========================

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


// initialize country selector when adding players
$("#countrySelector").countrySelector();



// ===================== PORTFOLIO ======================
