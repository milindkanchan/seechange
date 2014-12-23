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

function displayError(msg, type){
  var message = '';
  if (type == 'Error'){
    message = "<div style='text-align:center;'>Error Message</div><div style='font-weight: normal;text-align:center;'>" + msg + "</div>"
  }else{
    message = "<div style='font-weight: normal;text-align:center;'>" + msg + "</div>"
  }
  
  jAlert(message, "BPM Project");
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
            console.log('Ajax Request failed. ' + errorThrown);            
          }
        });

      })
  //}    
}

function getWidgetList(){
  var cachedWgtList = localStorage.getItem("cachedWidgetList");
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
        listItems   +=  "<option value='show.html?id=" + category.id + "'>" + category.title + "</option>";
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
        omData = getOmDataPoints(index, category.data, category.setting, 0)

        if(tmp_cnt === 1){
          pdf_listing +=  "<div>";
          pdf_listing +=  "<div class='row'>";
        }

        pdf_listing += "<div class='col-md-4'>";
        if(omData[1] === true){
        pdf_listing +=  "<div class='portlet box grey' onclick=showWidget('"+category.id+"');>";
        }else{
        pdf_listing +=  "<div class='portlet box red'  onclick=showWidget('"+category.id+"');>";
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

function showWidget(widgetId){
  window.location.href = "show.html?id=" + widgetId;
}

function showWidgetSetting(widgetId){
  var data =  $.parseJSON(localStorage.getItem("cachedWidgetList"));
  if (data !== null){
    setWidgetList(data);
    var child = data;
    var pdf_listing = "";
    var div_listing = "";
    var tmp_cnt = 0;
    var omData = '';
    var cnt = 0;
    if (child == null){
      pdf_listing = "";
    }else{
      var clength = child.length;
      $.each(child, function(index, category){
          if (category.id == widgetId){
            cnt = tmp_cnt;
            console.log(cnt);
          }  
          omData = getOmDataPoints(index, category.data, category.setting, 1)

          pdf_listing +=  "<div>";

          if(omData[2] == ''){
            pdf_listing +=  "<div class='row'>";
              pdf_listing +=  widgetWithOutThreshold(category, omData);
            pdf_listing +=  "</div>";
          }else{
            pdf_listing +=  widgetWithThreshold(category, omData);
          }

          pdf_listing +=  "</div>";
          tmp_cnt += 1

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
      swipe: true
    });
    $('.image_slider').slickGoTo(cnt);
  }
  $(".loading").hide();  
}

function widgetWithOutThreshold(category, omData){

  var pdf_listing = '';

  pdf_listing += "<div class='col-md-4'></div>";

  pdf_listing += "<div class='col-md-4'>";
  if(omData[1] === true){
  pdf_listing +=  "<div class='portlet box grey' >";
  }else{
  pdf_listing +=  "<div class='portlet box red' >";
  }
  pdf_listing +=    "<div class='portlet-title'>";
  pdf_listing +=      "<div class='caption'>" + category.title + "</div>";
  pdf_listing +=    "</div>";
  pdf_listing +=    "<div class='portlet-body'>";
  pdf_listing +=      omData[0];
  pdf_listing +=    "</div>";
  pdf_listing +=  "</div>";
  pdf_listing += "</div>";

  pdf_listing += "<div class='col-md-4'></div>";

  return pdf_listing
}

function widgetWithThreshold(category, omData){

  var pdf_listing = '';
  pdf_listing +=  "<div class='row'>";
  pdf_listing +=    "<div class='col-md-6'>";
  if(omData[1] === true){
  pdf_listing +=      "<div class='portlet box grey' >";
  }else{
  pdf_listing +=      "<div class='portlet box red' >";
  }
  pdf_listing +=        "<div class='portlet-title'>";
  pdf_listing +=          "<div class='caption'>" + category.title + "</div>";
  pdf_listing +=        "</div>";
  pdf_listing +=        "<div class='portlet-body'>";
  pdf_listing +=          omData[0];
  pdf_listing +=        "</div>";
  pdf_listing +=      "</div>";
  pdf_listing +=    "</div>";

  pdf_listing +=    "<div class='col-md-6'>";
  pdf_listing +=      "<div class='portlet box blue' >";
  pdf_listing +=        "<div class='portlet-title'>";
  pdf_listing +=          "<div class='caption'>Widget Setting(" + category.title + ") </div>";
  pdf_listing +=        "</div>";
  pdf_listing +=        "<div class='portlet-body'>";
  pdf_listing +=          omData[2];
  pdf_listing +=        "</div>";
  pdf_listing +=      "</div>";
  pdf_listing +=    "</div>";  

  pdf_listing +=  "</div>";

  return pdf_listing
  
}

function getOmDataPoints(key, categoryData, setting, more){  
  var data_list;
  var child = categoryData;  
  var itmcnt = 0;
  var modDate = '';
  var widError = '';
  $.each(child, function(index, category){   
    if(index ==='alert'){
      data_list = widgetAlert(category, setting, more);
      return;
    }else if(index === "asset"){
      data_list = widgetAssets(category, setting, more);
      return;
    }else if(index === "bgw"){
      data_list = widgetBGW(category, setting, more);
      return;
    }else if(index === "contentDistributor"){
      data_list = widgetCD(category, setting, more);
      return;
    }else if(index === "pgw"){
      data_list = widgetPGW(category, setting, more);
      return;
    }else if(index === "publisher"){
      data_list = widgetPublisher(category, setting, more);
      return;
    }else if(index === "streams"){
      data_list = widgetStreams(category, setting, more);
      return;
    }else if(index === "systems"){
      data_list = widgetSystems(category, setting, more);
      return;
    }
  });  
  return [data_list[0], data_list[1], data_list[2]];
}



