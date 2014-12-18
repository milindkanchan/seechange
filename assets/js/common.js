var baseUrl = '';
$(document).ready(function (){  
  baseUrl = $.parseJSON(localStorage.getItem("baseUrl"));
  //alert(baseUrl);
});

function getUrlParams(){
    var results = new RegExp('[\?]id=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    } 
}

function getExtraUrlParams(){
    var results = new RegExp('[\&]sid=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    } 
}

function trimDocumentname(docName)
{
  //alert(docName);
  if (docName.length > 40){
    var name = docName.replace(/%20/g, ' ');
    var nname = name.substr(0, 35);
    return nname + "..."
  }else{
    return docName.replace(/%20/g, ' ');
  }

}

/* ------ Category List realted functions -------- */

function callWidgetList(status){
  //if (networkStatus() === 1){
    var baseUrl = $.parseJSON(localStorage.getItem("baseUrl"));
    console.log("Server call to get widget list....");
    jQuery.support.cors = true;
      $(function (){
        $.ajax({
          url: baseUrl + "/healthcheck/widgets",
          dataType: "json",
          xhrFields: {
            'withCredentials': true
          },
          crossDomain: true,
          cache: true,
          success: function(data, textStatus) {
            console.log("Got reponse from server for widget list....");
            localStorage.setItem("cachedWidgetList", JSON.stringify(data));
            setWidgetList(data);
            if (status === true){
              if (window.location.href.indexOf("show.html") > 0){
                showWidgetDetailsFlip(data);
              }else{
                showWidgetDetails(data);
              }
            }
          },
          error: function (responseData, textStatus, errorThrown) {
              //displayError("Unable to fetch data, please try logging again.", 'Error');
              alert("Unable to fetch data, please try logging again.");
              console.log('Ajax Request failed. ' + errorThrown);
              //window.location.href = "index.html";
          }
        });

      })
  //}    
}

function getWidgetList(){
  var cachedWgtList = localStorage.getItem("cacheWidgetList");
  console.log(cachedWgtList)
  if (cachedWgtList !== null){
    console.log("Fetching widget select/details list from cache...");
    cdWgtList = $.parseJSON(cachedWgtList);
    //setWidgetList(cachedWgtList)    
    if (window.location.href.indexOf("show.html") > 0){
      showWidgetDetailsFlip(cdWgtList)      
    }else{
      showWidgetDetails(cdWgtList);  
    }
    callWidgetList(false);
  }else{
    console.log("Fetching widget select/details list from server...");
    callWidgetList(true);
  }
}

function setWidgetList(responseData){
  if (responseData !== null){
    var child = responseData;
    var listItems = "";
    if (child !== null){ 
      $.each(child, function(index, category){
        listItems   +=  "<option value='listing.html?id=" + category.id + "'>" + category.title + "</option>";
      })
      localStorage.setItem("cacheSelectWidget", listItems);
      $("#selectCategoryList").append(listItems);    
    }else{
      displayError("Unable to fetch data,  please try logging out and logging back in.", 'Error');
    }
  }
}

function isOdd(num) { return num % 2;}

function showWidgetDetails(data){  
  
  console.log($(".loading").css('display'));
  if (data !== null){
    var user_id = 1
    var child = data;
    var pdf_listing = "";
    var div_listing = "";
    var cnt = 1;
    var tmp_cnt = 1;
    var omData = '';
    var tmp_list = []
    if (child == null){
      pdf_listing = "";
    }else{
      var clength = child.length;
      $.each(child, function(index, category){
        omData = getOmDataPoints(index, category.data, category.setting)

        if(tmp_cnt === 1){
          pdf_listing +=  "<div>";
          pdf_listing +=  "<div class='row'>";
        }
        pdf_listing += "<div class='col-md-4'>";
        if(omData[1] === true){
        pdf_listing +=  "<div class='portlet box grey'>";
        }else{
        pdf_listing +=  "<div class='portlet box red'>";  
        }
        pdf_listing +=    "<div class='portlet-title'>";
        pdf_listing +=      "<div class='caption'>" + category.title + "</div>";
        pdf_listing +=    "</div>";
        pdf_listing +=    "<div class='portlet-body'>";
        pdf_listing +=    omData[0];
        pdf_listing +=    "</div>";
        pdf_listing +=  "</div>";
        pdf_listing += "</div>";

        if(tmp_cnt === 3){
          pdf_listing +=  "</div>";
          pdf_listing +=  "</div>";
          tmp_cnt = 1;
        }else{
          tmp_cnt += 1;
        }        
      })
    }
    $(".image_slider").html(pdf_listing);
    $('.image_slider').slick({
      dots: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 20000000,
    });    
  }
  $(".loading").hide();  
}

function getOmDataPoints(key, categoryData, setting){  
  var data_list;
  var child = categoryData;  
  var itmcnt = 0;
  var modDate = '';
  var widError = '';
  $.each(child, function(index, category){   
    if(index ==='alert'){
      data_list = widgetAlert(category, setting, 1);
      return;
    }else if(index === "asset"){
      data_list = widgetAssets(category, setting, 1);
      return;
    }else if(index === "bgw"){
      data_list = widgetBGW(category, setting, 1);
      return;
    }else if(index === "contentDistributor"){
      data_list = widgetCD(category, setting, 1);
      return;
    }else if(index === "pgw"){
      data_list = widgetPGW(category, setting, 1);
      return;
    }else if(index === "publisher"){
      data_list = widgetPublisher(category, setting, 1);
      return;
    }else if(index === "streams"){
      data_list = widgetStreams(category, setting, 1);
      return;
    }else if(index === "systems"){
      data_list = widgetSystems(category, setting, 1);
      return;
    }
  });  
  return [data_list[0], data_list[1]];
}


function showWidgetDetailsFlip(data){
  if (data !== null){
    var user_id = 1
    var child = data;
    var pdf_listing = "";
    var div_listing = "";
    var cnt = 1;
    var tmp_cnt = 1;
    var itm_cnt = 1;
    var cat_ids = [];
    var cat_urls = [];
    if (child == null){
      pdf_listing = "";
    }else{
      var clength = child.length;
      $.each(child, function(index, category){
        console.log(category.title)
        //pdf_listing += "<div class='card_container'>"
        //pdf_listing += "<a href='show.html'>";
        //pdf_listing +=  "<img title='" +  category.title + "' class='card_image'>";
        //pdf_listing +=  "<div class='card_title'>" + category.title + "</div>";
        //pdf_listing += "</a>"
        //pdf_listing += "</div>"

        pdf_listing += "<div class='row' style='padding-top:120px;'>";
        //pdf_listing += "<div class='col-md-4'></div>";
        pdf_listing += "<div class='col-md-4 col-md-offset-4'>";
        pdf_listing +=  "<div class='portlet box grey'>";
        pdf_listing +=    "<div class='portlet-title'>";
        pdf_listing +=      "<div class='caption'>" + category.title + "</div>";
        //pdf_listing +=      "<div class='tools'>";
        //pdf_listing +=        "<a href='javascript:;' class='collapse'></a>";
        //pdf_listing +=        "<a href='#potlet-config' data-toggle='modal' class='config'></a>";
        //pdf_listing +=        "<a href='javascript:;' class='reload'></a>";
        //pdf_listing +=        "<a href='javascript:;' class='remove'></a>";
        //pdf_listing +=      "</div>";
        pdf_listing +=    "</div>";
        pdf_listing +=    "<div class='portlet-body'>";
        pdf_listing +=      "<div><h4> Content for Placement only</h4></div>";
        //pdf_listing +=      "<div>";
        pdf_listing +=        "<div style='background:rgba(0,0,0,.1); float:left; margin:0 2.25% 20px 0; padding:1%'>";
        pdf_listing +=          "<h6>High Severity</h6>"
        pdf_listing +=          "<a href='#'>1</a>"
        pdf_listing +=        "</div>"
        pdf_listing +=        "<div style='background:rgba(0,0,0,.1); float:left; margin:0 2.25% 20px 0; padding:1%'>";
        pdf_listing +=          "<h6>Medium Severity</h6>"
        pdf_listing +=          "<a href='#'>2</a>"
        pdf_listing +=        "</div>"
        pdf_listing +=        "<div style='background:rgba(0,0,0,.1); float:left; margin:0 2.25% 20px 0; padding:1%'>";
        pdf_listing +=          "<h6>Low Severity</h6>";
        pdf_listing +=          "<a href='#'>3</a>";
        pdf_listing +=        "</div>";
        //pdf_listing +=      "</div>";
        pdf_listing +=      "<div>";
        pdf_listing +=        "<h6>Recent alerts</h6>";
        pdf_listing +=        "<ul>"
        pdf_listing +=          "<li><a href='#'>Service 1</a></li>"
        pdf_listing +=          "<li><a href='#'>Service 2</a></li>"
        pdf_listing +=          "<li><a href='#'>Service 3</a></li>"
        pdf_listing +=        "</ul>";
        pdf_listing +=        "<small>Last Update December 2, 2014 14:14:19</small>"
        pdf_listing +=      "</div>";
        pdf_listing +=    "</div>";
        pdf_listing +=  "</div>";
//        pdf_listing += "<div class='col-md-4'></div>";
        pdf_listing += "</div>";

        pdf_listing += "</div>";

        if (itm_cnt === 1){
          div_listing += "<div class='item active'>" + pdf_listing + "</div>"
          //div_listing += "<div id='row'>"      
          //div_listing += "<div class='contaniner listing_container row' id='row_listing'>" + pdf_listing + "</div>"
          //div_listing += "</div>"
          //div_listing += "</div>"
          //div_listing += "<div class='contaniner listing_container row' id='row_listing'><div class='item active'>" + pdf_listing + "</div></div>";
        }else{
          div_listing += "<div class='item'>" + pdf_listing + "</div>"
          //div_listing += "<div class='item'>"
          //div_listing += "<div id='row'>"      
          //div_listing += "<div class='contaniner listing_container row' id='row_listing'>" + pdf_listing + "</div>"
          //div_listing += "</div>"
          //div_listing += "</div>"
          //div_listing += "<div class='contaniner listing_container row' id='row_listing'><div class='item'>" + pdf_listing + "</div></div>";
        }
        pdf_listing = '';
        itm_cnt += 1;
      })
    }
    console.log(div_listing);

    $(".carousel-inner").html(div_listing);
    //$("#carousel-inner").html(div_listing);
    if (clength === 1){
      $("#leftSlide").hide();
      $("#rightSlide").hide();
    }
  }else{
    div_listing += "<div class='item'>"
    div_listing +=  "<div id='row'>"      
    div_listing +=  "<div class='contaniner listing_container row' id='row_listing'></div>"
    div_listing += "</div></div>"
    $(".carousel-inner").html(div_listing);    
    $("#leftSlide").hide();
    $("#rightSlide").hide();
    displayError("Unable to fetch data, please try logging out and logging back in.", 'Error');
    //window.location.href = "home.html";    
  }  
}