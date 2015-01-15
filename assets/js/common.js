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
    var results = new RegExp('[\&]type=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    } 
}

function getCntExtraUrlParams(){
    var results = new RegExp('[\&]cnt=([^&#]*)').exec(window.location.href);
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
              }//else{
              //  showWidgetDetails(data);
              //}
            }
          },
          error: function (responseData, textStatus, errorThrown) {
            console.log('Ajax Request failed. ' + errorThrown);            
          }
        });

      })
  //}    
}

function callConfigurationList(status){
  //if (networkStatus() === 1){
    var baseUrl = $.parseJSON(localStorage.getItem("baseUrl"));
    console.log("Server call to get configuration list....");
    jQuery.support.cors = true;
      $(function (){
        $.ajax({
          url: baseUrl + "/healthcheck/get_configurations",
          dataType: "json",
          xhrFields: {
            'withCredentials': true
          },
          crossDomain: true,
          cache: true,
          success: function(data, textStatus) {
            console.log("Got reponse from server for configuration list....");
            localStorage.setItem("cachedConfigurationList", JSON.stringify(data));
            setConfigurationList(data);
            /*if (status === true){
              if (window.location.href.indexOf("show.html") > 0){
                showWidgetDetailsFlip(data);
              }else{
                showWidgetDetails(data);
              }
            }*/
          },
          error: function (responseData, textStatus, errorThrown) {
            console.log('Ajax Request failed. ' + errorThrown);            
          }
        });

      })
  //}    
}

function callComponentList(status){
  //if (networkStatus() === 1){
    var baseUrl = $.parseJSON(localStorage.getItem("baseUrl"));
    console.log("Server call to get component list....");
    jQuery.support.cors = true;
      $(function (){
        $.ajax({
          url: baseUrl + "/healthcheck/get_component",
          dataType: "json",
          xhrFields: {
            'withCredentials': true
          },
          crossDomain: true,
          cache: true,
          success: function(data, textStatus) {
            console.log("Got reponse from server for component list....");
            localStorage.setItem("cachedComponentList", JSON.stringify(data));
            setComponentList(data);
            /*if (status === true){
              if (window.location.href.indexOf("show.html") > 0){
                showWidgetDetailsFlip(data);
              }else{
                showWidgetDetails(data);
              }
            }*/
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
  var cachedConfList = localStorage.getItem("cachedConfigurationList");
  var cachedCompList = localStorage.getItem("cachedComponentList");

  if (cachedWgtList !== null && cachedConfList !== null){
    
    console.log("Fetch from cache...");
    cdWgtList = $.parseJSON(cachedWgtList);
    cdConfList = $.parseJSON(cachedConfList);
    cdCompList= $.parseJSON(cachedCompList);

    if (window.location.href.indexOf("show.html") > 0){
      showWidgetDetailsFlip(cdWgtList)
    }else if (window.location.href.indexOf("home.html") > 0){
      setWidgetList(cdWgtList);
      setConfigurationList(cdConfList);
      setComponentList(cdCompList);
    }else{
      showWidgetDetails(cdWgtList);  
      callConfigurationList(cdConfList);
    }
    callWidgetList(false);
    callConfigurationList(true);
    callComponentList(true);
  }else{
    console.log("Fetch details from server...");
    callWidgetList(true);
    callConfigurationList(true);
    callComponentList(true);
  }
}

function setWidgetList(responseData){
  if (responseData !== null){
    var child = responseData;
    var listItems = "";
    var homeList = "";
    var itm_cnt = 1;
    if (child !== null){ 
      $.each(child, function(index, category){

        //listItems   +=  "<option value='show.html?id=" + category.id + "'>" + category.title + "</option>";
        
        if (category.exception === true && category.widget_error === false){
          homeList += "<p style='border:2px solid rgba(255, 0, 0, 0.98);' onclick=redirectToShow('" + category.id + "','widget','" + itm_cnt + "');>" + category.title +  "<i class='fa fa-chevron-right' style='padding-right:10px;float:right;color:rgba(255, 0, 0, 0.98);'></i></p>"          
        }else{          
          homeList += "<p onclick=redirectToShow('" + category.id + "','widget,'" + itm_cnt + "');>" + category.title +  "<i class='fa fa-chevron-right' style='padding-right:10px;float:right;'></i></p>"          
        }   
        itm_cnt += 1;
      })
      //localStorage.setItem("cacheSelectWidget", listItems);
      if (window.location.href.indexOf("home.html") > 0){
       $("#divWidgets").html(homeList); 
      }  
      //$("#selectCategoryList").append(listItems);    
    }else{
      displayError("Unable to fetch data,  please try logging out and logging back in.", 'Error');
    }
  }
}

function setConfigurationList(responseData){
  if (responseData !== null){
    var child = responseData;
    var homeList = "";
    var itm_cnt = 1;
    if (child !== null){ 
      $.each(child, function(index, category){
        homeList += "<p onclick=redirectToShow('" + category.id + "','conf','" + itm_cnt + "');>" + category.title +  "<i class='fa fa-chevron-right' style='padding-right:10px;float:right;'></i></p>"
        itm_cnt += 1;
      })
      if (window.location.href.indexOf("home.html") > 0){
       $("#divConf").html(homeList); 
      }
    }else{
      displayError("Unable to fetch data,  please try logging out and logging back in.", 'Error');
    }
  }
}

function setComponentList(responseData){
  if (responseData !== null){
    var child = responseData;
    var homeList = "";
    var itm_cnt = 1;
    if (child !== null){ 
      $.each(child, function(index, category){
        homeList += "<p onclick=redirectToShow('" + category.id + "','comp','" + itm_cnt + "');>" + category.title +  "<i class='fa fa-chevron-right' style='padding-right:10px;float:right;'></i></p>"
        itm_cnt += 1;
      })
      if (window.location.href.indexOf("home.html") > 0){
       $("#divAlerts").html(homeList); 
      }
    }else{
      displayError("Unable to fetch data,  please try logging out and logging back in.", 'Error');
    }
  }
}

function redirectToShow(cat_id, cat_type, click_cnt){
  window.location.href = "show.html?id=" + cat_id + "&type=" + cat_type + "&cnt=" + click_cnt;
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

function showWidgetSetting(widgetId, widgetType, click_cnt){
  var data = '';
  if(widgetType === "widget"){
    data =  $.parseJSON(localStorage.getItem("cachedWidgetList"));
  }else if(widgetType === "conf"){
    data =  $.parseJSON(localStorage.getItem("cachedConfigurationList"));
  }else if(widgetType === "comp"){
    data =  $.parseJSON(localStorage.getItem("cachedComponentList"));
  }

  if (data !== null){
    //setWidgetList(data);
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
          }
          if(widgetType === "widget"){
            omData = getOmDataPoints(index, category.data, category.setting, 1)
          }else if(widgetType === "conf"){
            omData = getConfigurationData(category, category.setting, 0)
          }else if(widgetType === "comp"){
            omData = getComponentData(category, category.alerts, 0)
          }  


          pdf_listing +=  "<div class='bb-item'>";

          if(omData[2] == ''){
            pdf_listing +=  "<div>";
              pdf_listing +=  widgetWithOutThreshold(category, omData);
            pdf_listing +=  "</div>";
          }else{
            pdf_listing +=  widgetWithThreshold(category, omData);
          }

          pdf_listing +=  "</div>";
          tmp_cnt += 1;
      })
    }
    /*$(".image_slider").html(pdf_listing);
    $('.image_slider').slick({
      dots: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 20000000,
      swipe: true
    });
    $('.image_slider').slickGoTo(cnt);*/
    $("#bb-bookblock").html(pdf_listing)
    //$("#navbb-block").html(nav_listing);
    Page.init();
    $("#bb-bookblock").bookblock('jump', parseInt(click_cnt));
  }
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
  pdf_listing +=  "<div>";
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

function getConfigurationData(categoryData, setting, more){  
  var data_list;
  data_list = getConfigurationDetails(categoryData, setting, more);  
  return [data_list[0], data_list[1], data_list[2]];
}

function getComponentData(categoryData, setting, more){  
  var data_list;
  data_list = getComponentDetails(categoryData, setting, more);  
  return [data_list[0], data_list[1], data_list[2]];
}
