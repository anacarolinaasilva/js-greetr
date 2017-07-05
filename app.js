

$("#login").click(function(){

  var loginGrtr = G$('Ana', 'Silva');

  $("#logindiv").hide();

  loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

})
