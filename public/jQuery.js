// Add a player dialog
$(function(){
  $("#showAddPlayerDialog").click(function(){
    $("#addPlayerDiv").removeClass("hidden");
    $("#addPlayerDiv").dialog({
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
      width: 'auto',
      height: 'auto'
    });
  });
});


// find selected option in player edit dialog
function findSelectedOption(){
  return $('#selectPlayerName').val();
}
