$("#btnLogin").click(function () {
  //var uname =  $("#SC_username");
  //var pass =  $("#SC_password"); 
  var ip = $("#SC_ip").val();
  var port = $("#SC_port").val();
  var proto = "http://"
  //var uri = "http://" + ip + ":" + port + "/mmc";
  if(port === '8443'){
    proto = "https://"
  }
  //var uri =  proto + ip + ":" + port  + "/mmc";
  var uri =  proto + ip + ":" + port;
  if ($.parseJSON(localStorage.baseUrl) !== uri){
    localStorage.clear();
  }
  localStorage.setItem("baseUrl", JSON.stringify(uri));
  jQuery.support.cors = true;
  console.log("Request for login to MMC.....");
  $(".loading").show();
  $(function (){
    $.ajax({
      url: uri + "/healthcheck/widgets",
      dataType: "json",
      xhrFields: {
        'withCredentials': true
      },
      crossDomain: true,
      cache: true,
      success: function(data, textStatus) {
        console.log("Got reponse from server for widget list....");
        localStorage.setItem("cachedWidgetList", JSON.stringify(data));
        window.location.href = "home.html";
      },
      error: function (responseData, textStatus, errorThrown) {
        //if(errorThrown.indexOf("Service Unavailable") >= 0){
          displayError("Unable to login/fetch data, as requested server/service is unavailable.", 'Error');
        //}else{
          //displayError("Unable to login data, as requested server/service is unavailable.", 'Error');
        //}
        console.log('Ajax Request failed. ' + errorThrown);
        $(".loading").hide();
      }
    });
  })

});

function logout(){

  window.location.href = "index.html";
}