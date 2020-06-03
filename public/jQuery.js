// Add a player dialog
$(function(){
  $("#showAddPlayerDialog").click(function(){
    $("#addPlayerDiv").removeClass("hidden");
    $("#addPlayerDiv").dialog();
  });
});
