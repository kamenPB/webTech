$(function(){
  $("#togglePars").click(function(){
    $("p").slideToggle();
  });
});


$(function(){
  $("#showAddPlayerDialog").click(function(){
    $("#addPlayerDiv").removeClass("hidden");
    $("#addPlayerDiv").dialog();
  });
});
