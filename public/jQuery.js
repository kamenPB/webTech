// Add a player dialog
$(function(){
  $("#showAddPlayerDialog").click(function(){
    $("#addPlayerDiv").removeClass("hidden");
    $("#addPlayerDiv").dialog({
      dialogClass: "addPlayerDialog",
      resizable: false,
      width: 400
    });
  });
});
